/**
 * The text of public/resume/Tobi-Olowu-CV.pdf, for search only (the PDF is what visitors download). Personal
 * phone and email are left out on purpose: search points people to the site's own contact channels.
 * Update this when the PDF changes.
 */

export interface CvRole {
  id: string;
  role: string;
  company: string;
  place: string;
  dates: string;
  points: string[];
}

export const CV_SUMMARY =
  "Product design leader with a decade of experience across fintech, investment, government, telecom and energy sectors, spanning consumer-scale growth products and technically complex enterprise platforms alike. Leads platform and AI design direction for Wood Mackenzie's flagship product line, led the interface design for an AI knowledge assistant, and built an enterprise design system now used across ten-plus teams; grew a consumer investment app from 11th to 3rd most-used in its market within three months. Comfortable working close to engineering, from API-driven platforms to AI-assisted and agentic product experiences; has coached 10+ designers into leadership roles of their own and spoken at UX Scotland 2025, and holds the UK's Exceptional Talent (Global Talent visa) endorsement for international-caliber expertise in digital technology. Based in London, United Kingdom.";

export const CV_SKILLS =
  'Core skills: Product Design, Design Systems, UX Research, User-Centered Design, Design Leadership & Coaching, Product Strategy, AI-Assisted & Agentic Design, Cross-Functional Collaboration (Product, Engineering, Research), Information Architecture, Wireframing & Prototyping, Interaction Design, Stakeholder Management, Growth & Conversion Design, Agile/Scrum. Tools & technologies: Figma (Auto Layout, Variables, Components), Sketch, InVision, Adobe Creative Suite, Zeplin, Dovetail, Amplitude, Hotjar, Balsamiq, API Design & Documentation, HTML, CSS, AI coding and agentic IDEs (Claude Code, Cursor, Figma Make, Kiro, Google Antigravity).';

export const CV_ROLES: CvRole[] = [
  {
    id: 'woodmac',
    role: 'Senior Product Designer (Lead Platform & AI)',
    company: 'Wood Mackenzie',
    place: 'London',
    dates: 'December 2023 – Present',
    points: [
      "Leading platform and AI design direction across Wood Mackenzie's flagship product suite, from full product redesigns to reshaping flows and interactions, and building internal AI tools and agentic product experiences in the energy sector.",
      'Used AI-native and agentic coding tools, including Claude Code, Cursor, Figma Make, Kiro and Google Antigravity, to prototype and ship features directly from design, accelerating handoff between design and engineering.',
      "Led the full redesign of Wood Mackenzie's flagship Lens Platform, improving navigation, interaction patterns and visual hierarchy, driving measurable gains in usability scores and client engagement.",
      'Led UX/UI design for an internal AI-powered knowledge assistant, defining conversational flows and integrating contextual data retrieval to cut analyst research time.',
      'Enhanced the Hydrocarbon Design System with scalable components, templates and organisms, reducing design-to-development timelines.',
      'Redesigned the internal documentation hub (Frontify), improving information architecture and cross-team collaboration.',
      'Ran design clinics and gave hands-on developer support, coaching the team to adopt system-driven design practices.',
    ],
  },
  {
    id: 'cvspan',
    role: 'Head of Design',
    company: 'CVSpan',
    place: 'Remote',
    dates: 'January 2021 – December 2023',
    points: [
      'Directed an in-house design team while seconded to major client engagements, including Qore Technologies, Moore Finance, Mango Asset Management and Korrency, setting design vision and standards and leading strategy and execution across web, mobile and platform experiences.',
      "Led design and brand strategy end-to-end for three fintech products: a next-generation banking app, admin platform and website for Moore Finance; a mobile app, admin dashboard and website for Mango Asset Management's digital wealth platform; and the mobile app and website for Korrency's currency exchange platform.",
      'Directed design across core banking, API aggregation and lending automation work, including a core banking SaaS product scaled to 500+ microfinance banks across Africa, and an API management platform with 15% higher developer adoption.',
      'Streamlined a lending automation system covering origination, approval, disbursement and repayment, reducing processing times by 40%.',
      'Built scalable design systems for CVSpan and client platforms, cutting delivery time by up to 50% and improving consistency.',
      'Trained 10+ designers in UX, product design and product management, and introduced Scrum to streamline collaboration with developers.',
    ],
  },
  {
    id: 'cousant',
    role: 'Software UI/UX Consultant',
    company: 'Cousant Technologies',
    place: 'Remote',
    dates: 'March 2018 – February 2021',
    points: [
      "Led design of a distribution management system for one of Africa's largest manufacturers, optimizing manufacturing and distribution operations across three subsidiaries as part of a digital transformation initiative.",
      'Grew an investment app (InvestNow) from 11th to 3rd most-used in its market within three months, through redesigned onboarding, a clearer information architecture, and a conversion-focused first-time-user flow; also designed a mobile app for a leading investment firm.',
      'Developed native mobile (iOS & Android) and web interfaces for an international stock trading platform.',
      'Designed a voice-first Conflict Early Warning Response System for the UNDP, cutting emergency report generation time from 95 to 4 seconds and training 100+ community monitors across Northern Nigeria.',
      'Translated stakeholder ideas into prototypes, achieving a 70% success rate in securing project funding.',
    ],
  },
  {
    id: 'akwa-ibom',
    role: 'Graduate Teaching & Research Assistant',
    company: 'Akwa Ibom State University',
    place: 'Nigeria',
    dates: 'November 2016 – November 2017',
    points: [
      'Taught Net-Centric Computing (Java, .NET, XML) and Web Design & Development (HTML, CSS, JavaScript, UX/UI methods) to 400-level courses of 50+ students.',
      'Led small-group teaching sessions and oversaw a student programming team, running regular tests to track progress.',
      'Contributed to research published as "A Comparative Analysis of Digital Technology (ICT) for Educational Development in Southern Nigeria".',
    ],
  },
  {
    id: 'fellow',
    role: 'Web User Interface Designer',
    company: 'Fellow Limited',
    place: 'Remote',
    dates: 'October 2014 – September 2016',
    points: [],
  },
];

export const CV_EDUCATION =
  'M.Sc. Enterprise Security and Digital Forensics, University of Technology Mauritius, 2016. B.Sc. (Hons, First Class) Information Technology and Business Information Systems, Middlesex University London, 2014.';

export const CV_CERTIFICATIONS =
  'Google Project Management (2024); Product Management Fundamentals (2024); Microsoft Certified: Security, Compliance & Identity Fundamentals (2022); PECB Lead Cloud Security Manager (2022); Accenture Digital Skills: User Experience (2020); Google Digital Skills for Africa (2018).';

export const CV_ACHIEVEMENTS =
  "Exceptional Talent Endorsement (UK Global Talent visa), Gov.uk: one of a limited number of designers granted this endorsement for demonstrated international-caliber expertise in digital technology. Finalist, Young CISO Award (2021): national recognition for leadership at the intersection of design, technology and security. Invited speaker, UX Scotland 2025. Led the redesign of InvestNow, taking it from 11th to 3rd most-used investment app in its market within three months.";
