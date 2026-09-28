import site from '../data/site.json';
import { publishedEntries, activeSections, localHref, sectionFor, absoluteDate } from '../lib/content';
const escapeXml = (v: string) => v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export async function GET() {
  const entries = await publishedEntries();
  const items = [{path:'/',updated:undefined as string|undefined}, ...activeSections(entries).filter(s=>s.archive).map(s=>({path:`/${s.route}/`,updated:undefined})), ...entries.filter(e=>sectionFor(e).detail && !e.data.externalUrl).map(e=>({path:localHref(e),updated:absoluteDate(e.data.updated || e.data.date)}))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items.map(i=>`<url><loc>${escapeXml(new URL(i.path,site.siteUrl).href)}</loc>${i.updated ? `<lastmod>${i.updated}</lastmod>` : ''}</url>`).join('')}</urlset>`;
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
