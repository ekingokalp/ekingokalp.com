import { readFile, readdir } from 'node:fs/promises';
import { resolve, join, relative, extname } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
const site = JSON.parse(await readFile('src/data/site.json','utf8'));
async function files(dir) { const out=[]; for (const e of await readdir(dir,{withFileTypes:true})) { const p=join(dir,e.name); out.push(...(e.isDirectory()?await files(p):[p])); } return out; }
const all=await files(root);
const htmlFiles=all.filter(p=>p.endsWith('.html'));
const docs=new Map();
const parseAttrs=(s)=>Object.fromEntries([...s.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(m=>[m[1],m[2]]));
for(const path of htmlFiles) {
  const html=await readFile(path,'utf8');
  const url=relative(root,path)==='index.html'?'/' : '/'+relative(root,path).replace(/index\.html$/,'').replaceAll('\\','/');
  docs.set(url,{path,html,ids:new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))});
}
let links=0, assets=0;
const external=new Set();
for(const [url,doc] of docs) {
  const {html}=doc;
  assert.match(html,/<html[^>]+lang="tr"/,`${url}: Dil eksik`);
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${url}: Tam bir h1 gerekli`);
  const headingLevels=[...html.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);
  for(let i=1;i<headingLevels.length;i++) assert(headingLevels[i]<=headingLevels[i-1]+1,`${url}: Başlık düzeyi atlanmış`);
  for(const name of ['description','twitter:card','twitter:title','twitter:description']) assert(new RegExp(`<meta[^>]+name="${name}"[^>]+content="[^"]+"`).test(html),`${url}: ${name} eksik`);
  for(const name of ['og:title','og:description','og:url','og:type']) assert(new RegExp(`<meta[^>]+property="${name}"[^>]+content="[^"]+"`).test(html),`${url}: ${name} eksik`);
  assert(html.includes(`rel="canonical" href="${new URL(url,site.siteUrl).href}"`),`${url}: Canonical hatası`);
  assert.match(html,/<main[^>]+id="main"/,`${url}: main eksik`);
  assert(!/<(?:script)[^>]*\bsrc=/.test(html),`${url}: Beklenmeyen istemci JavaScript’i`);
  const blocks=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(blocks.length>0,`${url}: JSON-LD eksik`);
  for(const [,body] of blocks) {
    const schema=JSON.parse(body);assert(schema['@graph'].some(s=>s['@type']==='Person'));assert(schema['@graph'].some(s=>s['@type']==='WebSite'));
  }
  assert(!/TODO|Coming soon|No experience yet/.test(html.replace(/<!--[\s\S]*?-->/g,'')),`${url}: Taslak işareti yayımlandı`);
  for(const [,raw] of html.matchAll(/<(?:a|link|img|source)\b([^>]+)>/g)) {
    const attrs=parseAttrs(raw);
    if(raw.includes('src=')&&attrs.src) {
      const p=new URL(attrs.src,new URL(url,site.siteUrl));
      if(p.origin===new URL(site.siteUrl).origin) { assert(all.includes(join(root,decodeURIComponent(p.pathname))),`${url}: Eksik asset ${p.pathname}`);assets++; }
    }
    if(attrs.srcset) for(const candidate of attrs.srcset.split(',')) {
      const p=new URL(candidate.trim().split(/\s+/)[0],new URL(url,site.siteUrl));
      if(p.origin===new URL(site.siteUrl).origin) assert(all.includes(join(root,decodeURIComponent(p.pathname))),`${url}: Eksik responsive asset ${p.pathname}`);
    }
    if(!attrs.href) continue;
    const target=new URL(attrs.href.replace(/&amp;/g,'&'),new URL(url,site.siteUrl));
    if(target.origin!==new URL(site.siteUrl).origin){if(/^https?:$/.test(target.protocol))external.add(target.href);continue;}
    const targetPath=decodeURIComponent(target.pathname);
    const dest=docs.get(targetPath);
    if(dest) {if(target.hash)assert(dest.ids.has(decodeURIComponent(target.hash.slice(1))),`${url}: Bozuk fragment ${attrs.href}`);links++;}
    else { assert(all.includes(join(root,targetPath)),`${url}: Bozuk bağlantı ${attrs.href}`);assets++; }
  }
  for(const [,attrs] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert(/\balt="[^"]+"/.test(attrs),`${url}: Alt metin eksik`);
    assert(/\bwidth=/.test(attrs)&&/\bheight=/.test(attrs),`${url}: Görsel ölçüleri eksik`);
  }
}
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
const expected=[...docs.keys()].filter(p=>p!=='/404.html');
for(const path of expected) assert(sitemap.includes(`<loc>${new URL(path,site.siteUrl).href}</loc>`),`Sitemap eksik: ${path}`);
assert(!sitemap.includes('/404.html'),'404 sitemap dışında olmalı');
assert.equal(await readFile(join(root,'CNAME'),'utf8'),'ekingokalp.com\n');
assert((await readFile(join(root,'robots.txt'),'utf8')).includes('Sitemap: https://ekingokalp.com/sitemap.xml'));
console.log(JSON.stringify({pages:docs.size,internalLinks:links,localAssets:assets,clientJavaScriptFiles:all.filter(p=>extname(p)==='.js').length,externalLinks:[...external],result:'PASS'},null,2));
