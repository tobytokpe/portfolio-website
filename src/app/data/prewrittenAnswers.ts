import type { PrewrittenAnswer } from '../search/types.js';

/**
 * Answers that cost nothing: matched in the browser before any AI call. Every fact here comes from the site's own
 * copy (case studies, About, Leadership, Contact). Edit freely; `links` must be real search ids or the build fails.
 * The six starter chips in the search card point at the first six.
 */
export const PREWRITTEN_ANSWERS: PrewrittenAnswer[] = [
  {
    id: 'pa/who',
    questions: ['who is tobi', 'who are you', 'about tobi', 'introduce yourself', 'tell me about tobi olowu', 'who is this'],
    answer:
      'Tobi Olowu is a product designer with over a decade of experience building B2C and B2B SaaS products across mobile and web. He has led design across finance, wealth management, energy and humanitarian technology, and is endorsed by the UK Government as an Exceptional Talent in Digital Technology.',
    links: ['about/bio', 'about/global-talent', 'about/intro'],
  },
  {
    id: 'pa/fintech',
    questions: ['fintech work', 'banking projects', 'fintech experience', 'has he worked in fintech', 'finance projects', 'banking experience'],
    answer:
      'Most of his work is in financial products: Qore, a white-label platform that powers banking apps for 500+ microfinance banks; Hydra, a B2B API gateway dashboard that processed over ₦60M; Moore, a digital banking app that grew to 8,000+ downloads; and MAMVest, an SEC-approved wealth platform.',
    links: ['qore/overview', 'hydra/overview', 'moore/overview'],
  },
  {
    id: 'pa/design-systems',
    questions: ['design systems', 'design system experience', 'design tokens', 'figma variables', 'token architecture', 'component library'],
    answer:
      'Design systems run through all of his projects. At Qore he built a Figma Variables token system exported through Style Dictionary, with a monochrome base that kept white-labelled apps accessible. At MAMVest he designed a 3-tier token system shared across Flutter and Tailwind. At Moore, tokens cut engineering handoff time by 50%.',
    links: ['qore/token-blueprint', 'mamvest/design-system', 'moore/tokenized-system'],
  },
  {
    id: 'pa/talks-writing',
    questions: ['talks and writing', 'has he given talks', 'articles', 'speaking', 'conference talks', 'what has he written', 'publications'],
    answer:
      'He spoke at UX Scotland on using AI for accessible design systems with variables. He has written for Zeroheight (AI and variables for accessible design systems), Wood Mackenzie\'s design practice on Medium (designing data tables with AG Grid) and the Qore blog (design thinking in fintech).',
    links: ['leadership/talk-ai-design-systems', 'leadership/zeroheight-article', 'leadership/ag-grid-article'],
  },
  {
    id: 'pa/experience',
    questions: ['cv', 'resume', 'cv and experience', 'work experience', 'career history', 'experience', 'roles'],
    answer:
      'He has over a decade of product design experience. Roles shown here include Lead Product Designer at Qore Technologies (Qore) and Mango Asset Management (MAMVest), Sole Product Designer on Hydra, Founding Designer at Moore, and Lead UX/UI Designer for the UNDP. For a full CV, get in touch.',
    links: ['about/bio', 'contact/email', 'qore/overview'],
  },
  {
    id: 'pa/contact',
    questions: ['get in touch', 'how to contact', 'contact', 'email', 'how can i reach him', 'hire tobi', 'work together', 'email address'],
    answer:
      'Email Tobi at oluwatobi.olowu@outlook.com, or connect on LinkedIn. More visual work is on Behance and Webbie.',
    links: ['contact/email', 'contact/linkedin', 'contact/behance'],
  },
  {
    id: 'pa/years',
    questions: ['how many years of experience', 'how long has he been designing', 'years of experience', 'how experienced is he'],
    answer: 'Over a decade, building B2C and B2B SaaS products across mobile and web platforms.',
    links: ['about/bio', 'about/journey'],
  },
  {
    id: 'pa/global-talent',
    questions: ['global talent', 'uk global talent', 'tech nation', 'exceptional talent', 'is he based in the uk', 'uk visa', 'right to work uk'],
    answer:
      'He is endorsed by the UK Government as an Exceptional Talent in Digital Technology (UK Global Talent), a highly selective credential for people making outstanding contributions to tech and design.',
    links: ['about/global-talent'],
  },
  {
    id: 'pa/undp',
    questions: ['un work', 'undp', 'united nations', 'humanitarian work', 'cewers', 'crisis app', 'social impact work'],
    answer:
      'For the UNDP he led design of CEWERS, a conflict early warning system for Taraba, Benue and Nasarawa in Northern Nigeria. He dropped mandatory sign-up, added one-tap voice reports and a single-screen alert grid. Report time fell from 95 seconds to 4, and every field-trial participant sent an alert successfully.',
    links: ['undp/overview', 'undp/panic-button', 'undp/trust-disconnected'],
  },
  {
    id: 'pa/hydra',
    questions: ['what is hydra', 'hydra', 'hydra project', 'api gateway dashboard'],
    answer:
      'Hydra is a B2B API gateway dashboard built by Qore Technologies. It brings scattered banking APIs, credentials and billing into one tool. As sole product designer he cut developer integration time by 46% and billing errors by 38%. It onboarded 45+ partners and processed over ₦60M.',
    links: ['hydra/overview', 'hydra/dashboards-code-lookups', 'hydra/results'],
  },
  {
    id: 'pa/qore',
    questions: ['what is qore', 'qore', 'qore project', 'white label banking', 'white-label platform'],
    answer:
      'Qore is a white-label platform that lets African microfinance banks launch branded web and mobile banking apps without months of code. He led its design: a no-code setup wizard for bank admins, a 2-minute customer onboarding flow and a token system. Launch time went from 4 months to an afternoon, across 500+ banks.',
    links: ['qore/overview', 'qore/management-layer', 'qore/results'],
  },
  {
    id: 'pa/mamvest',
    questions: ['what is mamvest', 'mamvest', 'wealth management', 'investment platform', 'mango asset management'],
    answer:
      'MAMVest is the SEC-approved digital wealth platform he designed for Mango Asset Management, giving retail investors access to mutual funds, bonds, treasury bills and commercial papers from ₦1,000. Leading a team of 3 designers, he cut time-to-invest from 3 to 5 business days to under 4 minutes.',
    links: ['mamvest/overview', 'mamvest/service-blueprint', 'mamvest/results'],
  },
  {
    id: 'pa/moore',
    questions: ['what is moore', 'moore', 'moore app', 'moore banking'],
    answer:
      'Moore is a digital banking app for new markets, where he was the founding designer. He cut onboarding from 8 stages to 5, replaced loading spinners with a payment progress tracker and built the token system. Onboarding drop-off fell from 48% to 14%, the app reached 8,000+ organic downloads, and it helped secure a seed round.',
    links: ['moore/overview', 'moore/onboarding', 'moore/payment-experience'],
  },
  {
    id: 'pa/signature-bank',
    questions: ['signature bank', 'signature bank website', 'bank website'],
    answer: 'Signature Bank is a website for a tier 1 bank, delivering a seamless digital banking experience for customers across Nigeria. It opens on the live site.',
    links: ['signature-bank/overview'],
  },
  {
    id: 'pa/accessibility',
    questions: ['accessibility', 'wcag', 'accessible design', 'inclusive design', 'a11y'],
    answer:
      'Accessibility is a constant in his work. Hydra and Moore were validated against WCAG 2.1 AA. At Qore he pinned app layouts to a safe monochrome base so banks\' brand colours couldn\'t break contrast. For UNDP he designed voice-first reporting and large tap targets for users with low literacy. He has also spoken about AI for accessible design systems.',
    links: ['qore/color-problem', 'moore/tokenized-system', 'leadership/talk-ai-design-systems'],
  },
  {
    id: 'pa/ai',
    questions: ['ai in design', 'does he use ai', 'ai experience', 'artificial intelligence', 'ai design systems'],
    answer:
      'His UX Scotland talk and Zeroheight article cover using AI to build accessible, scalable design systems with variables faster. On the UNDP project he argued against on-device AI translation because it added up to 12 seconds of delay in a crisis, and chose raw audio streaming instead.',
    links: ['leadership/talk-ai-design-systems', 'leadership/zeroheight-article', 'undp/panic-button'],
  },
  {
    id: 'pa/onboarding',
    questions: ['onboarding', 'onboarding redesign', 'reduce drop-off', 'sign up flow', 'conversion'],
    answer:
      'Onboarding is a recurring win. At Moore he cut drop-off from 48% to 14% by trimming 8 stages to 5 with real-time validation. At Qore, account opening takes under 2 minutes and onboarding failures fell from 45% to under 8%. At UNDP, removing login completely eliminated registration drop-off.',
    links: ['moore/onboarding', 'qore/customer-app-core', 'undp/trust-disconnected'],
  },
  {
    id: 'pa/impact',
    questions: ['biggest impact', 'results', 'metrics', 'achievements', 'outcomes', 'business impact'],
    answer:
      'Highlights: Qore scaled to 500+ microfinance banks and cut launch time from 4 months to an afternoon. Hydra processed ₦60M+ and onboarded 45+ partners. Moore reached 8,000+ organic downloads and a seed round. MAMVest cut time-to-invest to under 4 minutes. UNDP alert reports went from 95 seconds to 4.',
    links: ['qore/results', 'hydra/results', 'moore/results'],
  },
  {
    id: 'pa/leadership',
    questions: ['leadership', 'does he manage designers', 'team lead', 'managing a team', 'design leadership'],
    answer:
      'He has directed design teams and aligned stakeholders across departments. At MAMVest he led 3 product designers and ran a 5-day alignment sprint with the executive team. At Moore he introduced Design Gates review checkpoints for junior designers. He also designed and teaches a product design course with CVSpan.',
    links: ['mamvest/legacy-institution', 'moore/results', 'leadership/cvspan-course'],
  },
  {
    id: 'pa/teaching',
    questions: ['teaching', 'mentoring', 'cvspan', 'course', 'does he teach'],
    answer:
      'He designed and facilitated the CVSpan Product Design Learning Course, covering UX research, interaction design, systems thinking and cross-platform development for African designers. He also organised and led the CVSpan Design Jam competition.',
    links: ['leadership/cvspan-course', 'leadership/cvspan-design-jam'],
  },
  {
    id: 'pa/data-tables',
    questions: ['data tables', 'ag grid', 'enterprise ui', 'dashboards', 'data heavy interfaces'],
    answer:
      'He wrote a deep dive on designing data tables with AG Grid for Wood Mackenzie\'s design practice. On Hydra he replaced confusing pie charts with line graphs and filters, and stress-tested tables with thousands of rows in Figma before any code was written.',
    links: ['leadership/ag-grid-article', 'hydra/dashboards-code-lookups'],
  },
  {
    id: 'pa/research',
    questions: ['user research', 'research methods', 'usability testing', 'card sorting', 'field research'],
    answer:
      'His research ranges from card sorting and a week of usability tests with admins and developers (Hydra), to expert interviews and benchmark tests (Qore), service blueprinting (MAMVest) and live field trials with community leaders, farmers and security workers in rural Nigeria (UNDP).',
    links: ['hydra/sorting-the-mess', 'qore/white-label-engine', 'undp/panic-button'],
  },
  {
    id: 'pa/engineering',
    questions: ['working with engineers', 'developer handoff', 'design to code', 'handoff'],
    answer:
      'He builds design-to-code pipelines: Figma Variables exported through Style Dictionary (Qore, MAMVest), tokens aligned to developer components (Moore, 50% faster handoff), and Zeplin with Tailwind tokens (UNDP). On Hydra he designed local JSON schema caching to avoid expensive API calls.',
    links: ['qore/token-blueprint', 'mamvest/design-system', 'moore/tokenized-system'],
  },
  {
    id: 'pa/mobile',
    questions: ['mobile apps', 'mobile design', 'ios android', 'app design'],
    answer:
      'Most of his projects span web and mobile: Moore\'s banking app, MAMVest\'s React Native and Flutter apps, Qore\'s white-labelled customer apps, and the UNDP\'s CEWERS app built for budget Android phones and poor networks.',
    links: ['moore/visual-flow', 'mamvest/legacy-institution', 'undp/digital-lifelines'],
  },
  {
    id: 'pa/journey',
    questions: ['how did he get into design', 'education', 'design journey', 'background story', 'university'],
    answer:
      'He grew up immersed in fine art, tracing and colouring images. At secondary school he designed flyers and artwork in CorelDRAW. At university he studied design-related courses such as Interaction Design, New Media and Novel Interactive Technologies. Design brought together his computer skills and creative passion.',
    links: ['about/journey'],
  },
  {
    id: 'pa/industries',
    questions: ['industries', 'what industries', 'sectors', 'domains'],
    answer: 'Finance and banking, wealth management, energy and humanitarian technology, across both B2C and B2B SaaS.',
    links: ['about/bio', 'qore/overview', 'undp/overview'],
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
    id: 'pa/b2b',
    questions: ['b2b saas', 'enterprise products', 'b2b experience', 'saas'],
    answer:
      'His B2B work includes Hydra, an API gateway dashboard for banks and fintechs; Qore\'s no-code management layer for bank admins; and MAMVest\'s internal Admin Control Desk for compliance officers.',
    links: ['hydra/overview', 'qore/management-layer', 'mamvest/results'],
  },
  {
    id: 'pa/startups',
    questions: ['startup experience', 'founding designer', 'early stage', 'zero to one'],
    answer:
      'At Moore he was the founding designer: he set the end-to-end experience and visual direction, designed the marketing site alongside the app to lower acquisition cost, and built the design system. The product helped Moore secure a Friends & Family seed round.',
    links: ['moore/visual-flow', 'moore/onboarding', 'moore/results'],
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
