import { MetadataRoute } from 'next';
import { PROJECTS } from '@/src/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: 'https://oluwatobi.cc',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  const projectRoutes = PROJECTS.filter((p) => p.id !== 'project6').map((project) => ({
    url: `https://oluwatobi.cc/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
