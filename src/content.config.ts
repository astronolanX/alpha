import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      date: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
