import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zhousai-zs.github.io',
  base: '/english-atlas',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
