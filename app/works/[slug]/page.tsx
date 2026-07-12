import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PROJECTS } from '@/src/data/projects';
import { CASE_STUDIES } from '@/src/data/caseStudies';
import { CaseStudyContent } from '@/components/CaseStudyContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS
    .filter((p) => p.id !== 'project6')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);
  const data = project ? CASE_STUDIES[project.id] : null;

  if (!project || !data) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: data.title,
    description: data.problem || project.description,
    openGraph: {
      title: `${data.title} | Tobi Olowu`,
      description: data.problem || project.description,
      type: 'article',
      url: `https://oluwatobi.cc/works/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} | Tobi Olowu`,
      description: data.problem || project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);
  if (!project) {
    notFound();
  }

  const data = CASE_STUDIES[project.id];
  if (!data) {
    notFound();
  }

  return (
    <CaseStudyContent
      project={project}
      data={data}
      slug={resolvedParams.slug}
    />
  );
}
