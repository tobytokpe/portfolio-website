// ─── Project thumbnail images (from src/assets/) ───────────────────────────
import projectImg1 from '@/src/assets/947a82d5fe77e989a24f0980b7accca6b672e014.png';
import projectImg2 from '@/src/assets/23219589c1a205fe377485579956acafd1b4f098.png';
import projectImg3 from '@/src/assets/case-studies/project3/mamvest-hero-alt.png';
import projectImg4 from '@/src/assets/7c865e05aec58c76ad849b692223a5fffeb0112c.png';
import projectImg5 from '@/src/assets/a398778366b9324607d700ade24de8649ef3b369.png';
import projectImg6 from '@/src/assets/3a62c1028d5d7219af66d2a4a1509be1fea7b2a7.png';

// ─── Leadership thumbnail images ────────────────────────────────────────────
import leadershipImg1 from '@/src/assets/c155cac86dd8ff90a2a85cab8016320721e754d1.png';
import leadershipImg2 from '@/src/assets/6c98f53f14f7bc06842b81eed62509f82d3eb07f.png';
import leadershipImg3 from '@/src/assets/ee3c15704633974bba90f26e3e6336a63e8d0d1e.png';
import leadershipImg4 from '@/src/assets/e1e3356660b323b0ab3e389e8d0faa92aa74992b.png';
import leadershipImg5 from '@/src/assets/30b8b64f96a5c24586ebb4bfd106e35cb3241c25.png';
import leadershipImg6 from '@/src/assets/b1106f77731fd77fc20c20de852879d67213bf40.png';

// ─── Hero image ─────────────────────────────────────────────────────────────
import heroImage from '@/src/assets/585c477c511121f68283baf747a1742f4dc74091.png';
import aboutMeSvg from '@/src/assets/about-me.svg';

export { heroImage, aboutMeSvg };

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  iframeUrl: string;
  imageSrc: any;
}

export interface Leader {
  id: string;
  title: string;
  description: string;
  imageSrc: any;
  iframeUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'project1',
    slug: 'Hydra',
    title: 'HYDRA: Bringing Order to Fragmented Banking Code',
    description:
      'User-centric SaaS B2B platform for financial industries, streamlining API integration, reducing costs, and driving fintech innovation.',
    tag: 'Fintech',
    iframeUrl: 'https://oolowu.com/select-projects/hydra-project-cc/',
    imageSrc: projectImg1,
  },
  {
    id: 'project2',
    slug: 'Qore',
    title: 'QORE: Launching Banking Apps Instantly',
    description:
      'Mobile banking app delivering seamless transactions, bill payments, and personalized insights for improved financial management.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/qore-cc/',
    imageSrc: projectImg2,
  },
  {
    id: 'project3',
    slug: 'MAMVest',
    title: 'MAMVest: Digitizing Traditional Wealth Management',
    description:
      'Digital wealth management platform democratizing access to institutional-grade instruments like Mutual Funds, Bonds, and Bills.',
    tag: 'Wealth Management',
    iframeUrl: 'https://oolowu.com/select-projects/mamvest-cc/',
    imageSrc: projectImg3,
  },
  {
    id: 'project4',
    slug: 'Moore',
    title: 'Moore: Making Digital Banking Simple for New Markets',
    description:
      'Digital banking app offering comprehensive financial management tools, from budgeting to secure transactions, in one user-friendly platform.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/moore-cc/',
    imageSrc: projectImg4,
  },
  {
    id: 'project5',
    slug: 'UNDP',
    title: 'UNDP: Rebuilding Security and Alert Systems in Crisis Zones',
    description:
      'Mobile app empowering users in conflict-prone areas with incident reporting, real-time updates, and authority connections for better safety.',
    tag: 'Social Impact',
    iframeUrl: 'https://oolowu.com/select-projects/cewers-cc/',
    imageSrc: projectImg5,
  },
  {
    id: 'project6',
    slug: 'Signature-Bank',
    title: 'Signature Bank',
    description:
      'A website for a tier 1 bank helping with seamless banking and transactions.',
    tag: 'Banking',
    iframeUrl: 'https://www.signaturebankng.com/',
    imageSrc: projectImg6,
  },
];

export const LEADERSHIP: Leader[] = [
  {
    id: 'leader1',
    title: 'Talk: Leveraging AI for Accessible Design Systems with Variables',
    description:
      'Diving into how I harnessed AI to build more inclusive, scalable, and flexible design systems.',
    imageSrc: leadershipImg1,
    iframeUrl:
      'https://uxscotland.net/programme/leveraging-ai-accessible-design-systems-variables',
  },
  {
    id: 'leader2',
    title: 'Article: AI and Variables',
    description:
      'Learn how AI can speed up the development of more accessible design systems with variables.',
    imageSrc: leadershipImg2,
    iframeUrl:
      'https://zeroheight.com/blog/ai-and-variables-building-more-accessible-design-systems-faster/',
  },
  {
    id: 'leader3',
    title: 'Article: Mastering AG-Grid: Designing Efficient Data Tables',
    description:
      'Best practices for AG-Grid data-tables, a framework renowned for its robust features.',
    imageSrc: leadershipImg3,
    iframeUrl:
      'https://medium.com/woodmac/mastering-ag-grid-designing-efficient-and-user-centered-data-tables-8fa35580f4f7',
  },
  {
    id: 'leader4',
    title: 'CVSpan Product Design Learning Course',
    description:
      'Comprehensive course equipping aspiring designers with hands-on training in user-centric product design and development.',
    imageSrc: leadershipImg4,
    iframeUrl: 'https://learn.cvspan.com/',
  },
  {
    id: 'leader5',
    title: 'CVSpan Design Jam Competition',
    description:
      'Organized and led collaborative design sprints, fostering innovation and teamwork within a vibrant community of designers and developers.',
    imageSrc: leadershipImg5,
    iframeUrl: 'https://example.com/leadership/design-jam',
  },
  {
    id: 'leader6',
    title: 'Article: Design Thinking in Fintech; Creating User-Centric Experience',
    description:
      'Exploring creativity and technology to craft engaging, user-centric financial experiences that redefine traditional banking.',
    imageSrc: leadershipImg6,
    iframeUrl:
      'https://qore.inc/design-thinking-in-crafting-user-centric-experiences/',
  },
];
