import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const dateValue = z.preprocess((value) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'number' ? String(value) : value;
}, z.string().regex(/^\d{4}(-\d{2})?(-\d{2})?$/, 'YYYY, YYYY-MM veya YYYY-MM-DD kullanın.').refine((value) => {
  const parts = value.split('-').map(Number);
  const [year, month = 1, day = 1] = parts;
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
}, 'Geçerli bir takvim tarihi kullanın.'));
const webUrl = z.string().url().refine((v) => /^https?:\/\//.test(v), 'http veya https bağlantısı gerekli.');

const entries = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!about/**'],
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Kalıcı slug: küçük harf, rakam ve kısa çizgi.'),
    description: z.string().min(1),
    subtitle: z.string().optional(),
    date: dateValue.optional(),
    updated: dateValue.optional(),
    startDate: dateValue.optional(),
    endDate: z.union([dateValue, z.literal('present')]).optional(),
    tags: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    github: webUrl.optional(),
    website: webUrl.optional(),
    externalUrl: webUrl.optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    featuredOrder: z.number().int().default(100),
    status: z.string().optional(),
    draft: z.boolean().default(false),
    organization: z.string().optional(),
    role: z.string().optional(),
    degree: z.string().optional(),
    grade: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    extra: z.record(z.string(), z.string()).optional(),
  }).refine(d => !d.image || !!d.imageAlt?.trim(), {message:'Kapak görseline anlamlı imageAlt ekleyin.', path:['imageAlt']}),
});
const about = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/about' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});
export const collections = { entries, about };
