import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://ekingokalp.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { host: '0.0.0.0' },
  vite: { server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] } },
});
