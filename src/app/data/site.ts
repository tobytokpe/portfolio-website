/**
 * The portfolio's own copy outside the case studies. The canvas, the mobile view and the search index all read
 * from here, so search always matches what's on the page. Images are attached in App.tsx (this file has no imports,
 * so the index build script can load it in plain Node).
 */

export interface SiteProject {
  id: string;
  slug: string;
  /** Search id prefix for this case study ("hydra" → "hydra/overview"). */
  searchKey: string;
  title: string;
  description: string;
  tag: string;
  iframeUrl: string;
  /** True when the project has no page of its own and opens an external site. */
  external?: boolean;
}

export const PROJECTS: SiteProject[] = [
  {
    id: 'project1',
    slug: 'Hydra',
    searchKey: 'hydra',
    title: 'HYDRA: Bringing Order to Fragmented Banking Code',
    description: 'User-centric SaaS B2B platform for financial industries, streamlining API integration, reducing costs, and driving fintech innovation.',
    tag: 'Fintech',
    iframeUrl: 'https://oolowu.com/select-projects/hydra-project-cc/',
  },
  {
    id: 'project2',
    slug: 'Qore',
    searchKey: 'qore',
    title: 'QORE: Launching Banking Apps Instantly',
    description: 'White-label B2B platform enabling African microfinance banks to launch fully branded digital banking apps instantly, scaling to 500+ institutions and cutting deployment from months to a single afternoon.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/qore-cc/',
  },
  {
    id: 'project3',
    slug: 'MAMVest',
    searchKey: 'mamvest',
    title: 'MAMVest: Digitizing Traditional Wealth Management',
    description: 'Digital wealth management platform democratizing access to institutional-grade instruments like Mutual Funds, Bonds, and Bills.',
    tag: 'Wealth Management',
    iframeUrl: 'https://oolowu.com/select-projects/mamvest-cc/',
  },
  {
    id: 'project4',
    slug: 'Moore',
    searchKey: 'moore',
    title: 'Moore: Making Digital Banking Simple for New Markets',
    description: 'Digital banking app offering comprehensive financial management tools, from budgeting to secure transactions, in one user-friendly platform.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/moore-cc/',
  },
  {
    id: 'project5',
    slug: 'UNDP',
    searchKey: 'undp',
    title: 'UNDP: Rebuilding Security and Alert Systems in Crisis Zones',
    description: 'Mobile app empowering users in conflict-prone areas with incident reporting, real-time updates, and authority connections for better safety.',
    tag: 'Social Impact',
    iframeUrl: 'https://oolowu.com/select-projects/cewers-cc/',
  },
  {
    id: 'project6',
    slug: 'Signature-Bank',
    searchKey: 'signature-bank',
    title: 'Signature Bank',
    description: 'A website for a tier 1 bank delivering a seamless digital banking experience for customers across Nigeria.',
    tag: 'Banking',
    iframeUrl: 'https://www.signaturebankng.com/',
    external: true,
  },
];

export interface SiteLeadership {
  id: string;
  searchId: string;
  title: string;
  description: string;
  iframeUrl: string;
  keywords?: string[];
}

export const LEADERSHIP: SiteLeadership[] = [
  {
    id: 'leader1',
    searchId: 'leadership/talk-ai-design-systems',
    title: 'Talk: Leveraging AI for Accessible Design Systems with Variables',
    description: 'Diving into how I harnessed AI to build more inclusive, scalable, and flexible design systems.',
    iframeUrl: 'https://uxscotland.net/programme/leveraging-ai-accessible-design-systems-variables',
    keywords: ['UX Scotland', 'conference', 'speaking', 'talk', 'figma variables', 'accessibility', 'AI'],
  },
  {
    id: 'leader2',
    searchId: 'leadership/zeroheight-article',
    title: 'Article: AI & Variables, Accessible Design Systems at Scale (Zeroheight)',
    description: 'Published on Zeroheight: a strategic exploration of how AI accelerates the development of accessible, scalable design systems using variables.',
    iframeUrl: 'https://zeroheight.com/blog/ai-and-variables-building-more-accessible-design-systems-faster/',
    keywords: ['writing', 'blog', 'article', 'design tokens', 'accessibility', 'AI'],
  },
  {
    id: 'leader3',
    searchId: 'leadership/ag-grid-article',
    title: 'Article: Mastering AG-Grid, Efficient Data Tables at Scale (Woodmac)',
    description: "Published in Woodmac's design practice on Medium: a practical deep-dive into designing user-centred, high-performance data tables for enterprise-grade products.",
    iframeUrl: 'https://medium.com/woodmac/mastering-ag-grid-designing-efficient-and-user-centered-data-tables-8fa35580f4f7',
    keywords: ['writing', 'medium', 'Wood Mackenzie', 'enterprise', 'data tables', 'AG Grid'],
  },
  {
    id: 'leader4',
    searchId: 'leadership/cvspan-course',
    title: 'CVSpan Product Design Learning Course',
    description: 'Designed and facilitated a hands-on product design curriculum, covering UX research, interaction design, systems thinking, and cross-platform development, to equip the next generation of African designers.',
    iframeUrl: 'https://learn.cvspan.com/',
    keywords: ['teaching', 'mentoring', 'course', 'education', 'curriculum'],
  },
  {
    id: 'leader5',
    searchId: 'leadership/cvspan-design-jam',
    title: 'CVSpan Design Jam Competition',
    description: 'Organized and led collaborative design sprints, fostering innovation and teamwork within a vibrant community of designers and developers.',
    iframeUrl: 'https://community.cvspan.com/designjam-2025/',
    keywords: ['community', 'competition', 'design sprint', 'hackathon', 'organising'],
  },
  {
    id: 'leader6',
    searchId: 'leadership/qore-design-thinking',
    title: 'Article: Design Thinking in Fintech, Crafting User-Centric Experiences (Qore)',
    description: 'Published on the Qore blog: how design thinking and systems-level creativity can reshape traditional banking into engaging, trust-building digital experiences.',
    iframeUrl: 'https://qore.inc/design-thinking-in-crafting-user-centric-experiences/',
    keywords: ['writing', 'article', 'fintech', 'design thinking', 'banking'],
  },
];

export const HERO_INTRO =
  "A product designer with a decade of untangling complex systems, fixing broken flows, and making sense of chaos across fintech, SaaS, and energy, from platforms serving 500+ banks to life-critical tools for the United Nations, all in the name of building things people actually want to use.";

export const ABOUT_BIO =
  "A product designer with over a decade of experience building B2C and B2B SaaS products across mobile and web platforms. I've led design initiatives across Finance, Wealth Management, Energy, and Humanitarian technology, directing teams of designers, aligning stakeholders across departments, and delivering user-centric solutions that drive significant business impact. Recently, I received the prestigious endorsement as an Exceptional Talent in Digital Technology by the UK Government, an acknowledgement of my dedication to the world of Design and Technology.";

export const GLOBAL_TALENT = {
  label: 'UK Global Talent Endorsement',
  text: 'Recognised as an Exceptional Talent in Digital Technology by the UK Government, a highly selective credential for those making outstanding contributions to tech and design.',
};

/** The text inside the About "journey" illustration (src/assets/about-me.svg), which is an image. */
export const DESIGN_JOURNEY =
  'Early years: immersed in fine arts, indulging in activities like tracing images and colorizing them. Secondary school: honed my design skills using Corel Draw, creating captivating flyers and artwork. University: had the opportunity to delve into design-related courses, such as Interaction Design, New Media and Novel Interactive Technologies. The synergy: design was the perfect synergy of my computer skills and creative passion.';

export const CONTACT = {
  email: 'oluwatobi.olowu@outlook.com',
  linkedin: 'https://www.linkedin.com/in/olowutobi/',
  webbie: 'https://www.webbie.io/u/001',
  behance: 'https://www.behance.net/oluwatobiolowu',
};
