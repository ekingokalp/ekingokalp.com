import { getCollection, type CollectionEntry } from 'astro:content';
import sections from '../data/sections.json';
export type Entry = CollectionEntry<'entries'>;
export type Section = (typeof sections)[number];
export { sections };
export function sectionFor(entry: Entry): Section {
  const folder = entry.id.split('/')[0];
  const section = sections.find((s) => s.folder === folder);
  if (!section) throw new Error(`Tanımsız içerik klasörü: ${folder}. src/data/sections.json dosyasına bölüm ekleyin.`);
  return section;
}
export function localHref(entry: Entry) {
  const section = sectionFor(entry);
  return section.detail ? `/${section.route}/${entry.data.slug}/` : `/#${section.route}`;
}
export function entryHref(entry: Entry) { return entry.data.externalUrl || localHref(entry); }
function dateKey(entry: Entry) {
  return entry.data.startDate || entry.data.date || (entry.data.endDate !== 'present' ? entry.data.endDate : undefined) || '';
}
export function compareEntries(a: Entry, b: Entry) {
  return a.data.order - b.data.order || dateKey(b).localeCompare(dateKey(a)) || a.data.title.localeCompare(b.data.title, 'tr');
}
export async function publishedEntries() {
  const entries = (await getCollection('entries')).filter(e => !e.data.draft);
  const routes = new Set<string>();
  const folders = new Set<string>();
  for (const s of sections) {
    if (folders.has(s.folder)) throw new Error(`Yinelenen bölüm klasörü: ${s.folder}`);
    folders.add(s.folder);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.route) || ['404','about'].includes(s.route)) throw new Error(`Geçersiz bölüm rotası: ${s.route}`);
    if (routes.has(s.route)) throw new Error(`Yinelenen bölüm rotası: ${s.route}`);
    routes.add(s.route);
  }
  const paths = new Set<string>();
  for (const entry of entries) {
    const section = sectionFor(entry);
    const path = `/${section.route}/${entry.data.slug}/`;
    if (paths.has(path)) throw new Error(`Yinelenen içerik URL’si: ${path}`);
    paths.add(path);
    if (section.kind === 'article' && !entry.data.date) throw new Error(`${entry.id}: Yazıya date alanı ekleyin.`);
  }
  return entries.sort(compareEntries);
}
export function inSection(entries: Entry[], section: Section) { return entries.filter(e => sectionFor(e).folder === section.folder); }
export function activeSections(entries: Entry[]) { return sections.filter(s => inSection(entries, s).length > 0); }
export function featuredEntries(entries: Entry[]) {
  return entries.filter(e => e.data.featured).sort((a,b) => a.data.featuredOrder - b.data.featuredOrder || compareEntries(a,b));
}
export function displayDate(value?: string) {
  if (!value) return '';
  if (value === 'present') return 'Devam ediyor';
  const bits = value.split('-');
  if (bits.length === 1) return value;
  return new Intl.DateTimeFormat('tr-TR', { year:'numeric', month:'long', ...(bits.length === 3 ? {day:'numeric'} : {}), timeZone:'UTC' }).format(new Date(`${value}${bits.length === 2 ? '-01' : ''}T00:00:00Z`));
}
export function period(entry: Entry) {
  const d = entry.data;
  if (d.startDate) return `${displayDate(d.startDate)}${d.endDate ? ' — ' + displayDate(d.endDate) : ''}`;
  return displayDate(d.date || d.endDate);
}
export function absoluteDate(value?: string) { return value?.length === 10 ? value : undefined; }
