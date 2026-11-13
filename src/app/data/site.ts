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
    id: 'project8',
    slug: 'Lens',
    searchKey: 'lens',
    title: 'Using AI to Connect Every Route to Our Data',
    description: 'Using AI to make data and insight easier to find, with one assistant across the platform.',
    tag: 'Enterprise AI',
    iframeUrl: '',
  },
  {
    id: 'project9',
    slug: 'Lens-Platform',
    searchKey: 'lens-platform',
    title: 'Analytics That Hold Up at a Million Rows',
    description: 'Redesigning tables, charts, maps and navigation for an enterprise analytics platform.',
    tag: 'Enterprise Analytics',
    iframeUrl: '',
  },
  {
    id: 'project10',
    slug: 'Strata',
    searchKey: 'strata',
    title: 'Strata: A Lego Set for Seven Products',
    description: "One design system for Qore's seven products: identical in Figma and code, every state covered, and readable by AI.",
    tag: 'Design System',
    iframeUrl: '',
  },
  {
    id: 'project1',
    slug: 'Hydra',
    searchKey: 'hydra',
    title: 'Hydra: When Banks Speak Five Different Languages',
    description: 'A B2B API gateway that pulls fragmented banking integrations into one dashboard, cutting integration time and giving fintechs one bill instead of five.',
    tag: 'Fintech',
    iframeUrl: 'https://oolowu.com/select-projects/hydra-project-cc/',
  },
  {
    id: 'project2',
    slug: 'Qore',
    searchKey: 'qore',
    title: 'Qore: 500 Banks, One Afternoon Each',
    description: 'A no-code setup wizard that lets African microfinance banks configure and launch a fully branded banking app, cutting deployment from months to a single afternoon across 500+ institutions.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/qore-cc/',
  },
  {
    id: 'project3',
    slug: 'MAMVest',
    searchKey: 'mamvest',
    title: 'MAMVest: From a Three-Day Wire Transfer to Under Four Minutes',
    description: 'A digital wealth platform that opens Mutual Funds, Bonds, and Treasury Bills to retail investors, replacing a paper-bound process that used to take days.',
    tag: 'Wealth Management',
    iframeUrl: 'https://oolowu.com/select-projects/mamvest-cc/',
  },
  {
    id: 'project4',
    slug: 'Moore',
    searchKey: 'moore',
    title: "Moore: Banking That Doesn't Feel Like Banking",
    description: 'A digital banking app that cut onboarding drop-off from 48% to 14% and turned a heavy banking backend into something that feels warm and fast, even on a slow connection.',
    tag: 'Banking',
    iframeUrl: 'https://oolowu.com/select-projects/moore-cc/',
  },
  {
    id: 'project5',
    slug: 'UNDP',
    searchKey: 'undp',
    title: 'UNDP: The Panic Button That Had to Work in Four Seconds',
    description: 'A voice-first early-warning app for conflict zones in Northern Nigeria, letting people send a location-tagged alert with no login and no signal, in seconds.',
    tag: 'Social Impact',
    iframeUrl: 'https://oolowu.com/select-projects/cewers-cc/',
  },
  {
    id: 'project7',
    slug: 'Bespoka',
    searchKey: 'bespoka',
    title: 'Bespoka: Building an Operating System for an Industry Nobody Digitised',
    description: 'A marketplace and full operating system for bespoke tailors, designed and built solo end to end, from client booking to order tracking to split-deposit invoicing.',
    tag: 'Marketplace',
    iframeUrl: '',
  },
  {
    id: 'project6',
    slug: 'Signature-Bank',
    searchKey: 'signature-bank',
    title: 'Signature Bank',
    description: 'A public website for a tier 1 bank, built to make digital banking feel straightforward for customers across Nigeria.',
    tag: 'Banking',
    iframeUrl: 'https://www.signaturebankng.com/',
    external: true,
  },
];

/** Case studies hidden until they're finished: not on the site, and never in search. */
export const HIDDEN_PROJECTS = ['project10'];

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
    title: 'Talk: AI for Accessible Design Systems with Variables',
    description: 'A UX Scotland talk on how I used AI and Figma variables to build design systems that are accessible by default, not by a later audit.',
    iframeUrl: 'https://uxscotland.net/programme/leveraging-ai-accessible-design-systems-variables',
    keywords: ['UX Scotland', 'conference', 'speaking', 'talk', 'figma variables', 'accessibility', 'AI'],
  },
  {
    id: 'leader2',
    searchId: 'leadership/zeroheight-article',
    title: 'Article: AI & Variables, Accessible Design Systems at Scale (Zeroheight)',
    description: 'Published on Zeroheight: how AI and variables together got us to an accessible, scalable design system faster than doing it by hand.',
    iframeUrl: 'https://zeroheight.com/blog/ai-and-variables-building-more-accessible-design-systems-faster/',
    keywords: ['writing', 'blog', 'article', 'design tokens', 'accessibility', 'AI'],
  },
  {
    id: 'leader3',
    searchId: 'leadership/ag-grid-article',
    title: 'Article: Mastering AG-Grid, Efficient Data Tables at Scale (Woodmac)',
    description: "Published on Medium for Woodmac's design practice: what it actually takes to design a data table that stays usable at enterprise scale.",
    iframeUrl: 'https://medium.com/woodmac/mastering-ag-grid-designing-efficient-and-user-centered-data-tables-8fa35580f4f7',
    keywords: ['writing', 'medium', 'Wood Mackenzie', 'enterprise', 'data tables', 'AG Grid'],
  },
  {
    id: 'leader4',
    searchId: 'leadership/cvspan-course',
    title: 'CVSpan Product Design Learning Course',
    description: 'A hands-on curriculum I designed and taught, covering UX research, interaction design, systems thinking, and cross-platform development, for the next generation of African designers.',
    iframeUrl: 'https://learn.cvspan.com/',
    keywords: ['teaching', 'mentoring', 'course', 'education', 'curriculum'],
  },
  {
    id: 'leader5',
    searchId: 'leadership/cvspan-design-jam',
    title: 'CVSpan Design Jam Competition',
    description: 'Organised and led collaborative design sprints, building real teamwork and momentum inside a growing community of designers and developers.',
    iframeUrl: 'https://community.cvspan.com/designjam-2025/',
    keywords: ['community', 'competition', 'design sprint', 'hackathon', 'organising'],
  },
  {
    id: 'leader6',
    searchId: 'leadership/qore-design-thinking',
    title: 'Article: Design Thinking in Fintech, Crafting User-Centric Experiences (Qore)',
    description: 'Published on the Qore blog: how systems-level design thinking turned traditional banking processes into digital experiences people actually trust.',
    iframeUrl: 'https://qore.inc/design-thinking-in-crafting-user-centric-experiences/',
    keywords: ['writing', 'article', 'fintech', 'design thinking', 'banking'],
  },
];

export const HERO_TAGLINE = 'Tobi Olowu · Product Design Lead, London';
export const HERO_HEADLINE = 'I make complicated things usable.';
export const HERO_INTRO =
  'Core banking for 500+ microfinance banks, a crisis alert system for the UN, and now AI and analytics tools at Wood Mackenzie.';

export const ABOUT_BIO =
  "A decade into product design, the thread running through my work isn't one industry or one kind of interface. It's a habit of taking something genuinely complicated and making it usable without flattening the complexity that actually matters.";
export const ABOUT_QUOTE =
  "I'd rather ship something slightly rough and fix it in the open than wait for a version that never ships at all.";

export const RESUME_URL = '/resume/Tobi-Olowu-CV.pdf';

export const CONTACT = {
  email: 'oluwatobi.olowu@outlook.com',
  linkedin: 'https://www.linkedin.com/in/olowutobi/',
  webbie: 'https://www.webbie.io/u/001',
  behance: 'https://www.behance.net/oluwatobiolowu',
};
export const CONTACT_INTRO = 'Got a project, a question, or just want to talk shop? Reach out through any of these.';
