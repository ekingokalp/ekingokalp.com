import site from '../data/site.json';
export function GET() { return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`, {headers:{'Content-Type':'text/plain; charset=utf-8'}}); }
