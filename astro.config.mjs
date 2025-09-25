// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.skill-wanderer.com',
  integrations: [tailwind(), mdx()],
  image: {
    // Enable additional image optimizations
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
