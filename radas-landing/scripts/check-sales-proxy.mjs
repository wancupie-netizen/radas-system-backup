import assert from 'node:assert/strict';
import {forwardSales,validSlug,validMedia,DEFAULT_EDITOR} from '../server/sales-proxy.mjs';
function response(){return {code:200,headers:{},body:null,setHeader(k,v){this.headers[k]=v},status(s){this.code=s;return this},send(b){this.body=b;return this},end(){return this}}}
const env={RADAS_SALES_BACKEND_TOKEN:'test-only',VERCEL_ENV:'preview'};
assert(validSlug('buku-forex-crypto'));assert(!validSlug('../admin'));assert(!validSlug(['book']));assert(!validMedia('../secret'));assert(validMedia('abc-123.webp'));
let calls=0;const fetcher=async(url,options)=>{calls++;assert.equal(url.origin,DEFAULT_EDITOR);assert.equal(url.pathname,'/api/public-page');assert.equal(url.searchParams.get('proxy'),'1');assert.equal(options.headers['OAI-Sites-Authorization'],'Bearer test-only');assert.equal(options.redirect,'error');return new Response('<html>RM65</html>',{headers:{'Content-Type':'text/html; charset=utf-8'}})};
let r=response();await forwardSales({method:'GET',query:{slug:'buku-forex-crypto'}},r,{env,fetcher});assert.equal(r.code,200);assert.equal(r.headers['Cache-Control'],'no-store');assert.equal(r.headers['X-Robots-Tag'],'noindex, nofollow');assert(r.body.toString().includes('RM65'));
r=response();await forwardSales({method:'GET',query:{slug:'../admin'}},r,{env,fetcher});assert.equal(r.code,404);assert.equal(calls,1);
r=response();await forwardSales({method:'POST',query:{slug:'book'}},r,{env,fetcher});assert.equal(r.code,405);
r=response();await forwardSales({method:'GET',query:{slug:'book'}},r,{env:{},fetcher});assert.equal(r.code,503);
r=response();await forwardSales({method:'GET',query:{slug:'draft'}},r,{env,fetcher:async()=>new Response('private draft',{status:404})});assert.equal(r.code,404);assert(!r.body.includes('private'));
r=response();await forwardSales({method:'GET',query:{slug:'book'}},r,{env,fetcher:async()=>new Response('login',{status:200,headers:{'Content-Type':'application/json'}})});assert.equal(r.code,502);
r=response();await forwardSales({method:'GET',query:{name:'abc.webp'}},r,{env,media:true,fetcher:async()=>new Response(new Uint8Array([1,2]),{headers:{'Content-Type':'image/webp'}})});assert.equal(r.code,200);assert(r.headers['Cache-Control'].includes('immutable'));
console.log('PASS: published-only fixed-origin proxy, private token, path validation, missing-config handling, no-store/unpublish, non-HTML rejection, immutable image proxy and preview noindex.');
