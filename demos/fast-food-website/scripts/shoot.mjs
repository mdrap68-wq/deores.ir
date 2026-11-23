import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const OUT = "shots";

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") console.log("PAGE ERROR:", m.text());
  });
  page.on("pageerror", (e) => console.log("PAGE EXCEPTION:", e.message));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const shoot = async (name) => {
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log("shot", name);
  };

  const scroll = async (y, ms = 1400) => {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(ms);
  };

  await shoot("01-hero-start");
  await scroll(1100);
  await shoot("02-hero-mid");
  await scroll(2400);
  await shoot("03-hero-late");
  await scroll(3200);
  await shoot("04-hero-assembled");

  const yOf = (id) => page.evaluate((i) => document.getElementById(i)?.getBoundingClientRect().top + window.scrollY, id);

  await scroll(await yOf("story") - 300);
  await shoot("05-story");
  await scroll(await yOf("menu") - 90);
  await shoot("06-menu-tabs");
  await scroll((await yOf("menu")) + 500);
  // hover a row to trigger cursor preview
  await page.mouse.move(700, 500);
  await page.evaluate(() => document.querySelectorAll(".menu-row")[1]?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true })));
  await page.mouse.move(760, 560);
  await page.waitForTimeout(700);
  await shoot("07-menu-preview");

  // add to cart + open drawer
  await page.evaluate(() => document.querySelectorAll(".menu-row")[0]?.querySelector("button")?.click());
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelectorAll(".menu-row")[1]?.querySelector("button")?.click());
  await page.waitForTimeout(400);
  await page.click('button[aria-label^="سبد خرید"]');
  await page.waitForTimeout(900);
  await shoot("08-cart-open");
  // continue to details
  const btns = await page.$$("aside button");
  for (const b of btns) {
    const t = await b.textContent();
    if (t?.includes("ادامه سفارش")) { await b.click(); break; }
  }
  await page.waitForTimeout(700);
  await shoot("09-cart-details");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);

  await scroll(await yOf("signature") - 200);
  await shoot("10-signature");
  await scroll(await yOf("delivery") - 300);
  await shoot("11-delivery");
  await scroll(await yOf("locations") - 200);
  await shoot("12-locations");
  await scroll(await yOf("manifesto") - 400);
  await scroll((await yOf("manifesto")) - 100, 900);
  await shoot("13-manifesto");
  await scroll((await yOf("footer")) - 600, 900);
  await shoot("14-social");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await shoot("15-footer");

  // mobile pass
  const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mp.goto(BASE, { waitUntil: "networkidle" });
  await mp.waitForTimeout(2400);
  await mp.screenshot({ path: `${OUT}/m1-hero.png` });
  await mp.evaluate(() => window.scrollTo(0, 3000));
  await mp.waitForTimeout(1500);
  await mp.screenshot({ path: `${OUT}/m2-hero-end.png` });
  const myOf = (id) => mp.evaluate((i) => document.getElementById(i)?.getBoundingClientRect().top + window.scrollY, id);
  await mp.evaluate(() => window.scrollTo(0, document.getElementById("menu").getBoundingClientRect().top + window.scrollY - 80));
  await mp.waitForTimeout(1200);
  await mp.screenshot({ path: `${OUT}/m3-menu.png` });
  console.log("done");

  await browser.close();
};

run();
