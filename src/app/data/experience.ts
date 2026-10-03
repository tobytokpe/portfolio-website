/* Career history, sourced from CV + LinkedIn profile (cross-referenced). */

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyDetail?: string;
  dates: string;
  location: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'woodmac',
    role: 'Senior Product Designer (Lead Platform & AI)',
    company: 'Wood Mackenzie',
    dates: 'December 2023 — Present',
    location: 'London',
    bullets: [
      "Leading platform and AI design direction across Wood Mackenzie's flagship product suite, from full product redesigns to internal AI tools and agentic product experiences in the energy sector.",
      'Led the full redesign of the flagship Lens Platform, improving navigation, interaction patterns and visual hierarchy, driving measurable gains in usability scores and client engagement.',
      'Led UX/UI for an internal AI-powered knowledge assistant, defining conversational flows and contextual data retrieval to cut analyst research time.',
      'Enhanced the Hydrocarbon Design System with scalable components, templates and organisms, reducing design-to-development timelines.',
    ],
  },
  {
    id: 'cvspan',
    role: 'Head of Design',
    company: 'CVSpan',
    companyDetail: 'seconded to Qore Technologies, Moore Finance, Mango Asset Management and Korrency',
    dates: 'January 2021 — December 2023',
    location: 'Remote',
    bullets: [
      'Directed an in-house design team while seconded to major client engagements, setting design vision and standards across web, mobile and platform experiences.',
      'Led design across core banking, API aggregation and lending automation work, including a core banking product scaled to 500+ microfinance banks and an API platform with 15% higher developer adoption.',
      'Streamlined a lending automation system covering origination through repayment, cutting processing times by 40%.',
      'Built scalable design systems cutting delivery time by up to 50%, and coached 10+ designers into UX, product design and product management roles of their own.',
    ],
  },
  {
    id: 'cousant',
    role: 'Software UI/UX Consultant',
    company: 'Cousant Technologies',
    dates: 'March 2018 — February 2021',
    location: 'Remote',
    bullets: [
      "Led design of a distribution management system for one of Africa's largest manufacturers, as part of a digital transformation initiative across three subsidiaries.",
      'Grew an investment app, InvestNow, from 11th to 3rd most-used in its market within three months, through redesigned onboarding and a conversion-focused first-time-user flow.',
      'Designed a cross-border investment platform that cut registration drop-off from 62% to 19%.',
      'Designed a voice-first Conflict Early Warning Response System for the UNDP, cutting emergency report generation time from 95 to 4 seconds and training 100+ community monitors across Northern Nigeria.',
    ],
  },
  {
    id: 'akwaibom',
    role: 'Graduate Teaching & Research Assistant',
    company: 'Akwa Ibom State University',
    dates: 'November 2016 — November 2017',
    location: 'Nigeria',
    bullets: [
      'Taught Net-Centric Computing (Java, .NET, XML) and Web Design & Development to 400-level courses of 50+ students.',
      'Led small-group teaching sessions and oversaw a student programming team.',
      'Contributed to research published as "A Comparative Analysis of Digital Technology (ICT) for Educational Development in Southern Nigeria."',
    ],
  },
  {
    id: 'fellow',
    role: 'Web User Interface Designer',
    company: 'Fellow Limited',
    dates: 'October 2014 — September 2016',
    location: 'Remote',
    bullets: [],
  },
];
