import type { PrewrittenAnswer } from '../search/types.js';

/**
 * Answers that cost nothing: matched in the browser before any AI call. Every fact here comes from the site's own
 * copy (case studies, About, Leadership, Contact) or the public CV. Protected case studies (Lens, Lens Platform)
 * only use their home-page card text and the CV. Edit freely; `links` must be real search ids or the build fails.
 * The six starter chips in the search card point at the first six.
 */
export const PREWRITTEN_ANSWERS: PrewrittenAnswer[] = [
  {
    id: 'pa/who',
    questions: ['who is tobi', 'who are you', 'about tobi', 'introduce yourself', 'tell me about tobi olowu', 'who is this'],
    answer:
      'Tobi Olowu is a Product Design Lead in London with about a decade in product design. He makes complicated things usable: core banking for 500+ microfinance banks, a crisis alert system for the UN, and now AI and analytics tools at Wood Mackenzie, where he leads platform and AI design.',
    links: ['about/intro', 'about/bio', 'cv/summary'],
  },
  {
    id: 'pa/fintech',
    questions: ['fintech work', 'banking projects', 'fintech experience', 'has he worked in fintech', 'finance projects', 'banking experience'],
    answer:
      'A lot of his work is financial products: Qore, a no-code platform that launches branded banking apps for 500+ microfinance banks; Hydra, an API gateway dashboard that has processed ₦60M+; Moore, a banking app that cut onboarding drop-off from 48% to 14%; and MAMVest, an SEC-approved wealth platform investing in under four minutes.',
    links: ['qore/overview', 'hydra/overview', 'moore/overview'],
  },
  {
    id: 'pa/design-systems',
    questions: ['design systems', 'design system experience', 'design tokens', 'figma variables', 'token architecture', 'component library'],
    answer:
      'Design systems run through his work. At Qore, Figma Variables export through Style Dictionary, with layouts locked and colours flexible so every bank\'s app stays accessible. MAMVest has a 3-tier token system across Flutter and Tailwind. Moore\'s token library halved engineering handoff time. At Wood Mackenzie he extends the Hydrocarbon Design System.',
    links: ['qore/token-blueprint', 'mamvest/design-system', 'moore/tokenized-system'],
  },
  {
    id: 'pa/talks-writing',
    questions: ['talks and writing', 'has he given talks', 'articles', 'speaking', 'conference talks', 'what has he written', 'publications'],
    answer:
      'He spoke at UX Scotland 2025 on AI for accessible design systems with variables. He has written for Zeroheight (AI and variables for accessible design systems), Wood Mackenzie\'s design practice on Medium (designing data tables with AG Grid) and the Qore blog (design thinking in fintech).',
    links: ['leadership/talk-ai-design-systems', 'leadership/zeroheight-article', 'leadership/ag-grid-article'],
  },
  {
    id: 'pa/experience',
    questions: ['cv', 'resume', 'cv and experience', 'work experience', 'career history', 'experience', 'roles', 'where has he worked'],
    answer:
      'Since December 2023 he has been Senior Product Designer, Lead Platform & AI at Wood Mackenzie in London. Before that he was Head of Design at CVSpan (2021 to 2023) and a Software UI/UX Consultant at Cousant Technologies (2018 to 2021). The full CV is a download on the site.',
    links: ['about/experience', 'cv/role-woodmac', 'contact/cv'],
  },
  {
    id: 'pa/contact',
    questions: ['get in touch', 'how to contact', 'contact', 'email', 'how can i reach him', 'hire tobi', 'work together', 'email address'],
    answer: 'Email Tobi at oluwatobi.olowu@outlook.com, or connect on LinkedIn. His CV is a download on the site, and more visual work is on Behance and Webbie.',
    links: ['contact/email', 'contact/linkedin', 'contact/cv'],
  },
  {
    id: 'pa/cv-download',
    questions: ['download cv', 'download resume', 'cv pdf', 'resume pdf', 'can i see his cv'],
    answer: 'Yes. His full CV is a PDF you can download from the Contact section or the About section.',
    links: ['contact/cv', 'about/experience'],
  },
  {
    id: 'pa/current-role',
    questions: ['current role', 'where does he work now', 'current job', 'wood mackenzie', 'what does he do now'],
    answer:
      'He is Senior Product Designer, Lead Platform & AI at Wood Mackenzie in London (since December 2023). He leads platform and AI design across the flagship product suite, including the redesign of the Lens Platform, an AI knowledge assistant, and the Hydrocarbon Design System.',
    links: ['cv/role-woodmac', 'about/experience', 'lens/overview'],
  },
  {
    id: 'pa/years',
    questions: ['how many years of experience', 'how long has he been designing', 'years of experience', 'how experienced is he'],
    answer: 'About a decade, across fintech, investment, government, telecom and energy, from consumer growth products to complex enterprise platforms.',
    links: ['about/bio', 'cv/summary'],
  },
  {
    id: 'pa/global-talent',
    questions: ['global talent', 'uk global talent', 'tech nation', 'exceptional talent', 'is he based in the uk', 'uk visa', 'right to work uk', 'awards', 'recognition'],
    answer:
      'He holds the UK Government\'s Exceptional Talent endorsement in digital technology (Global Talent visa). He was also an invited speaker at UX Scotland 2025 and a finalist for the Young CISO Award in 2021.',
    links: ['leadership/recognition', 'cv/achievements'],
  },
  {
    id: 'pa/lens',
    questions: ['lens', 'lens 2.0', 'what is lens', 'ai assistant project', 'wood mackenzie ai'],
    answer:
      'Lens is his Wood Mackenzie case study on using AI to make data and insight easier to find, with one assistant across the platform. It\'s password protected, so ask Tobi for access.',
    links: ['lens/overview', 'contact/email'],
  },
  {
    id: 'pa/lens-platform',
    questions: ['lens platform', 'analytics platform', 'million rows', 'enterprise analytics'],
    answer:
      'Lens Platform is his redesign of tables, charts, maps and navigation for Wood Mackenzie\'s enterprise analytics platform. It\'s password protected, so ask Tobi for access.',
    links: ['lens-platform/overview', 'contact/email'],
  },
  {
    id: 'pa/bespoka',
    questions: ['bespoka', 'what is bespoka', 'tailor app', 'side project', 'founder project'],
    answer:
      'Bespoka is his own product: a marketplace and operating system for bespoke tailors, designed and built solo, including the Node backend. Buyers book verified tailors; tailors run orders through a 6-stage tracker that updates clients automatically, with split-deposit invoicing. It\'s pre-launch.',
    links: ['bespoka/overview', 'bespoka/order-pipeline', 'bespoka/building-solo'],
  },
  {
    id: 'pa/undp',
    questions: ['un work', 'undp', 'united nations', 'humanitarian work', 'cewers', 'crisis app', 'social impact work'],
    answer:
      'For the UNDP he led design of CEWERS, a voice-first early-warning app for conflict zones in Northern Nigeria. People send a location-tagged alert with no login and no stable signal. He swapped hidden swipe cards for a one-screen alert grid and one-tap voice, cutting report time from 95 seconds to 4.',
    links: ['undp/overview', 'undp/panic-button', 'undp/trust-disconnected'],
  },
  {
    id: 'pa/hydra',
    questions: ['what is hydra', 'hydra', 'hydra project', 'api gateway dashboard'],
    answer:
      'Hydra is a B2B API gateway dashboard for Qore Technologies that pulls fragmented banking integrations, credentials and billing into one place. As sole product designer he helped cut developer integration time by 46% and billing errors by 38%. It onboarded 45+ partners and has processed ₦60M+.',
    links: ['hydra/overview', 'hydra/dashboards-code-lookups', 'hydra/results'],
  },
  {
    id: 'pa/qore',
    questions: ['what is qore', 'qore', 'qore project', 'white label banking', 'white-label platform'],
    answer:
      'Qore lets African microfinance banks launch a branded banking app without months of code. He led design of a no-code setup wizard inside a locked-down token system, plus a 2-minute customer onboarding. Launch time went from 4 months to an afternoon, onboarding failure from 45% to under 8%, across 500+ banks.',
    links: ['qore/overview', 'qore/management-layer', 'qore/results'],
  },
  {
    id: 'pa/mamvest',
    questions: ['what is mamvest', 'mamvest', 'wealth management', 'investment platform', 'mango asset management'],
    answer:
      'MAMVest is the SEC-approved wealth platform he designed for Mango Asset Management, opening mutual funds, bonds, treasury bills and commercial papers to retail investors from ₦1,000. Leading three designers, he took investing from 3 to 5 business days to 3 minutes 42 seconds, and onboarding abandonment from 54% to 11%.',
    links: ['mamvest/overview', 'mamvest/service-blueprint', 'mamvest/results'],
  },
  {
    id: 'pa/moore',
    questions: ['what is moore', 'moore', 'moore app', 'moore banking'],
    answer:
      'Moore is a digital banking app where he was the founding designer. He cut the eight-stage onboarding, replaced spinners with a payment progress tracker and built the token system. Drop-off fell from 48% to 14%, accidental double-taps to 0.2%, and it reached 8,000+ organic downloads and a seed round.',
    links: ['moore/overview', 'moore/onboarding', 'moore/results'],
  },
  {
    id: 'pa/signature-bank',
    questions: ['signature bank', 'signature bank website', 'bank website'],
    answer: 'Signature Bank is a public website for a tier 1 bank, built to make digital banking feel straightforward for customers across Nigeria. It opens on the live site.',
    links: ['signature-bank/overview'],
  },
  {
    id: 'pa/accessibility',
    questions: ['accessibility', 'wcag', 'accessible design', 'inclusive design', 'a11y'],
    answer:
      'Accessibility is a starting point in his work, not an audit. Hydra and Moore were checked against WCAG 2.1 AA. At Qore he anchored apps to a safe monochrome base so banks\' brand colours couldn\'t break contrast. UNDP\'s app is voice-first for people who can\'t type under stress. He also spoke on AI for accessible design systems.',
    links: ['qore/color-problem', 'moore/tokenized-system', 'leadership/talk-ai-design-systems'],
  },
  {
    id: 'pa/ai',
    questions: ['ai in design', 'does he use ai', 'ai experience', 'artificial intelligence', 'ai design systems', 'agentic'],
    answer:
      'He leads platform and AI design at Wood Mackenzie, including an AI knowledge assistant, and prototypes with agentic coding tools like Claude Code and Cursor. His UX Scotland talk and Zeroheight article cover AI for accessible design systems. On UNDP he cut on-device AI translation because it added up to 12 seconds in a crisis.',
    links: ['cv/role-woodmac', 'leadership/talk-ai-design-systems', 'lens/overview'],
  },
  {
    id: 'pa/onboarding',
    questions: ['onboarding', 'onboarding redesign', 'reduce drop-off', 'sign up flow', 'conversion'],
    answer:
      'Onboarding is a recurring win. Moore went from 48% to 14% drop-off with real-time validation and fewer stages. Qore\'s account opening takes under two minutes, with failures down from 45% to under 8%. MAMVest\'s abandonment fell from 54% to 11%. On UNDP, removing login ended registration drop-off.',
    links: ['moore/onboarding', 'qore/customer-app-core', 'mamvest/results'],
  },
  {
    id: 'pa/impact',
    questions: ['biggest impact', 'results', 'metrics', 'achievements', 'outcomes', 'business impact'],
    answer:
      'Highlights: 500+ banks on Qore, with launch time cut from 4 months to an afternoon. Moore\'s drop-off from 48% to 14% and 8,000+ organic downloads. UNDP report time from 95 seconds to 4. Hydra\'s ₦60M+ processed. And InvestNow from 11th to 3rd in its market in three months.',
    links: ['about/impact', 'qore/results', 'moore/results'],
  },
  {
    id: 'pa/leadership',
    questions: ['leadership', 'does he manage designers', 'team lead', 'managing a team', 'design leadership', 'mentoring designers'],
    answer:
      'He was Head of Design at CVSpan, directing an in-house team across client work, and has coached 10+ designers into leadership roles. On MAMVest he led three designers and ran a 5-day alignment sprint with the executives. At Moore he introduced Design Gates so junior designers had a clear standard.',
    links: ['cv/role-cvspan', 'mamvest/legacy-institution', 'moore/results'],
  },
  {
    id: 'pa/teaching',
    questions: ['teaching', 'mentoring', 'cvspan', 'course', 'does he teach'],
    answer:
      'He designed and taught the CVSpan Product Design Learning Course for African designers and organised the CVSpan Design Jam. Earlier he was a graduate teaching assistant at Akwa Ibom State University, teaching web design and net-centric computing.',
    links: ['leadership/cvspan-course', 'leadership/cvspan-design-jam', 'cv/role-akwa-ibom'],
  },
  {
    id: 'pa/data-tables',
    questions: ['data tables', 'ag grid', 'enterprise ui', 'dashboards', 'data heavy interfaces'],
    answer:
      'He wrote about designing data tables that stay usable at enterprise scale with AG Grid for Wood Mackenzie\'s design practice. His Lens Platform case study redesigns tables, charts, maps and navigation for an analytics platform (password protected).',
    links: ['leadership/ag-grid-article', 'lens-platform/overview', 'hydra/dashboards-code-lookups'],
  },
  {
    id: 'pa/research',
    questions: ['user research', 'research methods', 'usability testing', 'card sorting', 'field research'],
    answer:
      'His research ranges from card sorting with real users (Hydra, Qore) and service blueprinting (MAMVest) to live field trials with community leaders, farmers and security workers in Northern Nigeria (UNDP).',
    links: ['hydra/sorting-the-mess', 'mamvest/service-blueprint', 'undp/panic-button'],
  },
  {
    id: 'pa/engineering',
    questions: ['working with engineers', 'developer handoff', 'design to code', 'handoff', 'can he code'],
    answer:
      'He works close to code: Figma Variables exported through Style Dictionary (Qore, MAMVest), a token library that halved Moore\'s handoff time, and Zeplin with Tailwind tokens on UNDP. He built Bespoka himself, backend included, and prototypes with agentic coding tools at Wood Mackenzie.',
    links: ['qore/token-blueprint', 'bespoka/building-solo', 'moore/results'],
  },
  {
    id: 'pa/mobile',
    questions: ['mobile apps', 'mobile design', 'ios android', 'app design'],
    answer:
      'Most of his projects span web and mobile: Moore\'s banking app, MAMVest\'s investing app, Qore\'s white-labelled customer apps, Bespoka\'s marketplace, and UNDP\'s CEWERS app built for budget Android phones and poor networks.',
    links: ['moore/overview', 'mamvest/overview', 'undp/overview'],
  },
  {
    id: 'pa/education',
    questions: ['education', 'degree', 'university', 'qualifications', 'where did he study'],
    answer:
      'He has an M.Sc. in Enterprise Security and Digital Forensics (University of Technology Mauritius, 2016) and a first-class B.Sc. in Information Technology and Business Information Systems (Middlesex University London, 2014), plus certifications in project and product management.',
    links: ['cv/education', 'cv/certifications'],
  },
  {
    id: 'pa/skills',
    questions: ['skills', 'tools', 'what tools does he use', 'figma', 'software he uses'],
    answer:
      'Core skills include product design, design systems, UX research, design leadership, product strategy and AI-assisted design. Tools include Figma (variables, components), Sketch, Zeplin, Dovetail, Amplitude, Hotjar, HTML and CSS, and agentic coding tools like Claude Code and Cursor.',
    links: ['cv/skills'],
  },
  {
    id: 'pa/industries',
    questions: ['industries', 'what industries', 'sectors', 'domains'],
    answer: 'Fintech and banking, investment and wealth management, government and humanitarian work, telecom, and energy, across both consumer and enterprise products.',
    links: ['cv/summary', 'qore/overview', 'undp/overview'],
  },
  {
    id: 'pa/linkedin',
    questions: ['linkedin', 'linkedin profile'],
    answer: 'You can connect with Tobi on LinkedIn.',
    links: ['contact/linkedin'],
  },
  {
    id: 'pa/visual-work',
    questions: ['behance', 'more visual work', 'dribbble', 'shots', 'webbie'],
    answer: 'More of his visual work is on Behance, and he also has a Webbie profile.',
    links: ['contact/behance', 'contact/webbie'],
  },
  {
    id: 'pa/startups',
    questions: ['startup experience', 'founding designer', 'early stage', 'zero to one'],
    answer:
      'He was founding designer at Moore, setting the experience and visual direction and helping it close a seed round. Bespoka is his own zero-to-one product, designed and built end to end.',
    links: ['moore/overview', 'bespoka/overview', 'moore/results'],
  },
];

/** The six chips on the welcome screen. */
export const STARTER_CHIPS: Array<{ label: string; answerId: string }> = [
  { label: 'Who is Tobi?', answerId: 'pa/who' },
  { label: 'Fintech work', answerId: 'pa/fintech' },
  { label: 'Design systems', answerId: 'pa/design-systems' },
  { label: 'Talks & writing', answerId: 'pa/talks-writing' },
  { label: 'Experience', answerId: 'pa/experience' },
  { label: 'Get in touch', answerId: 'pa/contact' },
];
