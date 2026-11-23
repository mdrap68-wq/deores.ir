"""Bounded browser checks: serve the built assets inside Playwright, with real API handlers.
No local server, fake data, or development process is required.
Run: python tests/browser-check.py (after npm run build).
"""
import json
import mimetypes
import subprocess
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://websima.test'
QA = ROOT / '.qa'
QA.mkdir(exist_ok=True)
BRIDGE = '''
import fs from 'node:fs';
const payload=JSON.parse(fs.readFileSync(0,'utf8'));
const {default:handler}=await import('./api/'+process.argv[1]+'.js');
const result={status:200,body:null};
const res={setHeader(){},status(code){result.status=code; return this},json(body){result.body=body;return this},end(){return this}};
await handler(payload,res);
console.log(JSON.stringify(result));
'''

def api(resource, method='GET', query=None, body=None):
    result = subprocess.run(['node','--env-file=.env','--input-type=module','-e',BRIDGE,resource], cwd=ROOT, input=json.dumps({'method':method,'query':query or {},'body':body or {}}), capture_output=True,text=True,check=True,timeout=25)
    return json.loads(result.stdout)

public = {resource: api(resource) for resource in ['projects','editorial']}
assert all(response['status'] == 200 for response in public.values())
created_receipts=[]
errors=[]
def serve(route):
    url=urlparse(route.request.url)
    path=unquote(url.path)
    if path.startswith('/api/'):
        resource=path.split('/')[-1]
        result=public.get(resource)
        if result is None:
            result=api(resource,route.request.method,{k:v[0] for k,v in parse_qs(url.query).items()},route.request.post_data_json if route.request.post_data else None)
        if result['status'] == 201:
            created_receipts.append(result['body']['reference'])
        route.fulfill(status=result['status'],content_type='application/json',body=json.dumps(result['body']))
        return
    file=ROOT/'dist'/(path.lstrip('/') or 'index.html')
    if file.is_file():
        route.fulfill(body=file.read_bytes(),content_type=mimetypes.guess_type(str(file))[0] or 'application/octet-stream')
    else:
        route.fulfill(status=404,body='Not found')

with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1,reduced_motion='reduce')
    page.on('pageerror',lambda err:errors.append(str(err)))
    page.route(BASE+'/**',serve)
    page.goto(BASE+'/',wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    expect(page.locator('.metric')).to_have_count(3)
    expect(page.locator('.featured-projects .project-card')).to_have_count(3)
    page.screenshot(path=str(QA/'desktop-final.png'))
    # Archive selection, filtering, no-results state, and project details.
    page.get_by_role('button',name='همه نمونه‌کارها').click()
    expect(page.locator('.gallery-grid .project-card')).to_have_count(6)
    page.locator('.filter-group').get_by_role('button',name='فروشگاه اینترنتی').click()
    expect(page.locator('.gallery-grid .project-card')).to_have_count(2)
    page.get_by_role('textbox',name='جست‌وجو در نمونه‌کارها').fill('not-a-project')
    expect(page.locator('.empty-state')).to_be_visible()
    page.get_by_role('button',name='نمایش همه پروژه‌ها').click()
    page.get_by_role('textbox',name='جست‌وجو در نمونه‌کارها').fill('homecubes')
    expect(page.locator('.gallery-grid .project-card')).to_have_count(1)
    page.locator('.gallery-grid .project-card').click()
    expect(page.locator('#dialog-title')).to_have_text('هوم‌کیوبز')
    page.get_by_role('button',name='بازگشت به آرشیو').click()
    expect(page.locator('.gallery-grid .project-card')).to_have_count(6)
    page.keyboard.press('Escape')
    expect(page.get_by_role('dialog')).to_have_count(0)
    # Desktop services dropdown and accordion selection.
    page.get_by_role('button',name='خدمات وبسیما',exact=True).click()
    page.locator('.dropdown-panel').get_by_role('button',name='طراحی فروشگاه اینترنتی').click()
    expect(page.locator('#service-ecommerce')).to_be_visible()
    page.locator('.service-row.active h3 button').click()
    expect(page.locator('#service-ecommerce')).to_be_hidden()
    page.locator('.service-row h3 button').last.click()
    expect(page.locator('#service-interface')).to_be_visible()
    page.locator('#service-interface').get_by_role('button').click()
    expect(page.locator('#consult-service')).to_have_value('طراحی رابط کاربری')
    page.keyboard.press('Escape')
    # Process navigation, keyboard tabs and FAQ state.
    page.get_by_role('tab').nth(2).click()
    expect(page.locator('#step-panel h3')).to_have_text('ایده‌ها شکل می‌گیرند.')
    page.keyboard.press('ArrowLeft')
    expect(page.get_by_role('tab').nth(3)).to_have_attribute('aria-selected','true')
    expect(page.get_by_role('button',name='مرحله بعدی')).to_be_disabled()
    question=page.locator('.faq-item h3 button').first
    question.click()
    expect(question).to_have_attribute('aria-expanded','true')
    expect(page.locator('.faq-answer').first).to_be_visible()
    question.click()
    expect(page.locator('.faq-answer').first).to_be_hidden()
    # The form validates, writes a real demo inquiry and reloads its receipt.
    page.locator('.header-cta').click()
    page.locator('button[type="submit"]').click()
    expect(page.locator('.field-error')).to_have_count(3)
    expect(page.locator('#consult-name')).to_be_focused()
    page.locator('#consult-name').fill('آزمون سامانه وبسیما')
    page.locator('#consult-phone').fill('۰۹۰۰۰۰۰۰۰۰۰')
    page.locator('#consult-service').select_option('طراحی سایت شرکتی')
    page.locator('#consult-brief').fill('بررسی عملکرد فرم؛ درخواست آزمایشی برای حذف پس از آزمون.')
    page.locator('button[type="submit"]').click()
    expect(page.locator('.confirmation')).to_be_visible(timeout=30000)
    assert created_receipts
    receipt=api('consultations',query={'reference':created_receipts[-1]})
    assert receipt['status']==200 and receipt['body']['status']=='received'
    assert set(receipt['body'])=={'reference','status','created_at'}
    page.keyboard.press('Escape')
    # Modal confinement and mobile navigation.
    page.set_viewport_size({'width':375,'height':812})
    page.evaluate('window.scrollTo(0,0)')
    page.get_by_role('button',name='باز کردن منو').click()
    expect(page.locator('#mobile-nav')).to_be_visible()
    page.locator('#mobile-nav').get_by_role('button',name='درباره ما').click()
    expect(page.locator('#dialog-title')).to_have_text('استودیو خلاق وبسیما')
    for _ in range(7):
        page.keyboard.press('Tab')
        assert page.evaluate('!!document.activeElement.closest("[role=dialog]")')
    page.keyboard.press('Escape')
    first_name=page.locator('.mobile-active .project-card').get_attribute('aria-label')
    page.get_by_role('button',name='پروژه بعدی').click()
    assert page.locator('.mobile-active .project-card').get_attribute('aria-label')!=first_name
    page.get_by_role('button',name='پروژه قبلی').click()
    page.evaluate('window.scrollTo(0,0)')
    page.screenshot(path=str(QA/'mobile-final.png'))
    for width in [320,375,390,600,768,1024,1280,1440,1920]:
        page.set_viewport_size({'width':width,'height':900})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), f'Overflow at {width}'
    assert not errors, errors
    print('Passed archive, search, filters, details, navigation, services, process, FAQ, validation, keyboard focus, mobile carousel, and 9 viewport checks.')
    print('Verified a saved database consultation and its private confirmation:',created_receipts[-1])
    browser.close()
