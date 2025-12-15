import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  const sortedProjects = projects.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  return rss({
    title: "Nolan's Portfolio",
    description: 'UX designer and frontend developer bridging design and engineering to build accessible, scalable experiences.',
    site: context.site ?? 'https://astronolan.com',
    items: sortedProjects.map((project) => ({
      title: project.data.title,
      description: project.data.description,
      pubDate: project.data.date,
      link: `/projects/${project.id}/`,
    })),
  });
}
