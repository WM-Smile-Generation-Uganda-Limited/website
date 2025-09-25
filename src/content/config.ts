import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    category: z.string(),
    image: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
