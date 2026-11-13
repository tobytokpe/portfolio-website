/** Everything the search index is built from. Shared by scripts/build-search-index.ts and the tests. */
import { CASE_STUDIES } from '../data/caseStudies';
import { PROJECTS, HIDDEN_PROJECTS, LEADERSHIP, HERO_TAGLINE, HERO_HEADLINE, HERO_INTRO, ABOUT_BIO, ABOUT_QUOTE, CONTACT, CONTACT_INTRO, RESUME_URL } from '../data/site';
import { STATS } from '../data/stats';
import { PRINCIPLES } from '../data/principles';
import { EXPERIENCE } from '../data/experience';
import { ACHIEVEMENTS } from '../data/recognition';
import { CV_SUMMARY, CV_SKILLS, CV_ROLES, CV_EDUCATION, CV_CERTIFICATIONS, CV_ACHIEVEMENTS } from '../data/cv';
import type { DocSources } from './buildDocs';

export const SOURCES: DocSources = {
  caseStudies: CASE_STUDIES,
  projects: PROJECTS,
  hiddenProjects: HIDDEN_PROJECTS,
  leadership: LEADERSHIP,
  hero: { tagline: HERO_TAGLINE, headline: HERO_HEADLINE, intro: HERO_INTRO },
  about: { bio: ABOUT_BIO, quote: ABOUT_QUOTE },
  stats: STATS,
  principles: PRINCIPLES,
  experience: EXPERIENCE,
  achievements: ACHIEVEMENTS,
  contact: { ...CONTACT, intro: CONTACT_INTRO },
  resumeUrl: RESUME_URL,
  cv: { summary: CV_SUMMARY, skills: CV_SKILLS, roles: CV_ROLES, education: CV_EDUCATION, certifications: CV_CERTIFICATIONS, achievements: CV_ACHIEVEMENTS },
};

/** Slugs of case studies that are on the site (hidden ones excluded). */
export const LIVE_SLUGS = PROJECTS.filter((p) => !HIDDEN_PROJECTS.includes(p.id)).map((p) => p.slug);
