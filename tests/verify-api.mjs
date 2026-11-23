import assert from 'node:assert/strict';
import projects from '../api/projects.js';
import editorial from '../api/editorial.js';
import consultations from '../api/consultations.js';

async function invoke(handler, req) {
  const response = { code: 200, headers: {}, body: null };
  const res = { setHeader(key, value) { response.headers[key] = value; }, status(value) { response.code = value; return this; }, json(body) { response.body = body; return this; }, end() { return this; } };
  await handler({ method: 'GET', query: {}, ...req }, res);
  return response;
}

for (const [handler, minimum] of [[projects, 6], [editorial, 15]]) {
  const result = await invoke(handler, {});
  assert.equal(result.code, 200);
  assert.ok(Array.isArray(result.body) && result.body.length >= minimum);
  assert.equal((await invoke(handler, { method: 'OPTIONS' })).code, 204);
  assert.equal((await invoke(handler, { method: 'DELETE' })).code, 405);
}
assert.equal((await invoke(consultations, { query: { reference: 'invalid' } })).code, 400);
assert.equal((await invoke(consultations, { method: 'POST', body: { name: 'آزمون', phone: '12345', service: 'طراحی سایت شرکتی' } })).code, 400);
assert.equal((await invoke(consultations, { method: 'POST', body: { name: 'آزمون', phone: '۰۹۰۰۰۰۰۰۰۰۰', service: '' } })).code, 400);
console.log('Passed: real portfolio and editorial reads, request validation, allowed HTTP methods, and CORS preflights.');
