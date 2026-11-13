import type { SearchDoc } from './types.js';
import { MAX_DOC_WORDS } from './indexConfig.js';
import type { SiteLeadership, SiteProject } from '../data/site.js';
import type { CvRole } from '../data/cv.js';

export interface DocSources {
  caseStudies: Record<string, any>;
  projects: SiteProject[];
  /** Hidden case studies are never indexed. */
  hiddenProjects: string[];
  leadership: SiteLeadership[];
  hero: { tagline: string; headline: string; intro: string };
  about: { bio: string; quote: string };
  stats: Array<{ value: string; label: string; category: string }>;
  principles: Array<{ title: string; body: string }>;
  experience: Array<{ role: string; company: string; years: string }>;
  achievements: Array<{ title: string; detail: string; year: string }>;
  contact: { email: string; linkedin: string; webbie: string; behance: string; intro: string };
  resumeUrl: string;
  cv: {
    summary: string;
    skills: string;
    roles: CvRole[];
    education: string;
    certifications: string;
    achievements: string;
  };
}

/** Extra words people search with that the copy itself doesn't always use. */
const PROJECT_KEYWORDS: Record<string, string[]> = {
  lens: ['Wood Mackenzie', 'AI assistant', 'enterprise AI', 'Lens 2.0', 'energy', 'data'],
  'lens-platform': ['Wood Mackenzie', 'Lens', 'analytics', 'data tables', 'charts', 'maps', 'enterprise', 'energy'],
  hydra: ['API gateway', 'B2B', 'SaaS', 'developer dashboard', 'billing', 'Qore Technologies', 'enterprise'],
  qore: ['white-label', 'multi-tenant', 'microfinance', 'no-code', 'Africa', 'design tokens', 'Qore Technologies'],
  mamvest: ['wealth management', 'investment', 'mutual funds', 'SEC', 'Mango Asset Management', 'service blueprint'],
  moore: ['onboarding', 'payments', 'startup', 'founding designer', 'seed round', 'mobile banking'],
  undp: ['United Nations', 'CEWERS', 'humanitarian', 'crisis', 'early warning', 'Nigeria', 'voice', 'panic button'],
  bespoka: ['tailors', 'fashion', 'marketplace', 'founder', 'side project', 'built solo', 'invoicing', 'orders'],
  'signature-bank': ['website', 'tier 1 bank', 'Nigeria'],
};

export const plain = (text: string) => text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

/** The readable text inside an infographic item (titles, steps, before/after rows, stats). */
function graphicText(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(graphicText);
  if (node && typeof node === 'object') {
    return Object.entries(node as Record<string, unknown>)
      .filter(([k]) => !['type', 'graphic', 'src', 'id', 'icon', 'tone', 'variant', 'url'].includes(k))
      .flatMap(([, v]) => graphicText(v));
  }
  return [];
}

function itemText(item: any): string {
  if (item.type === 'paragraph' || item.type === 'subheading' || item.type === 'cta') return item.text ?? '';
  if (item.type === 'graphic') return graphicText(item).join('. ');
  return '';
}

/** Splits text over MAX_DOC_WORDS into chunks at sentence ends. */
function chunks(text: string): string[] {
  const words = text.split(' ');
  if (words.length <= MAX_DOC_WORDS) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [text];
  const out: string[] = [];
  let current = '';
  for (const s of sentences) {
    if (current && (current + s).split(' ').length > MAX_DOC_WORDS) {
      out.push(current.trim());
      current = '';
    }
    current += s;
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

/** Everything searchable on the site, flattened into SearchDocs with stable ids. */
export function buildDocs(src: DocSources): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const push = (doc: SearchDoc) => {
    const parts = chunks(doc.text);
    parts.forEach((text, i) => docs.push({ ...doc, id: i === 0 ? doc.id : `${doc.id}~${i + 1}`, text }));
  };

  for (const p of src.projects) {
    if (src.hiddenProjects.includes(p.id)) continue;
    const key = p.searchKey;
    const short = p.title.split(':')[0].trim();
    const keywords = [p.tag, ...(PROJECT_KEYWORDS[key] ?? [])];
    if (p.external) {
      push({ id: `${key}/overview`, kind: 'case-study', title: p.title, text: p.description, keywords, target: { type: 'external', url: p.iframeUrl }, url: p.iframeUrl });
      continue;
    }
    const cs = src.caseStudies[p.id];
    if (!cs) throw new Error(`No case study data for ${p.id}`);

    // Password-protected (NDA) case studies: only the card text that's on the home page. Never their summary,
    // metadata or sections, so nothing behind the password reaches the index, the browser bundle or Gemini.
    if (cs.passwordHash) {
      push({
        id: `${key}/overview`,
        kind: 'case-study',
        title: p.title,
        parent: p.tag,
        text: `${p.description} This case study is password protected; ask Tobi for access.`,
        keywords,
        target: { type: 'case-study', slug: p.slug },
      });
      continue;
    }

    const meta = Object.entries(cs.metadata ?? {})
      .map(([k, v]) => `${k}: ${v}.`)
      .join(' ');
    push({
      id: `${key}/overview`,
      kind: 'case-study',
      title: cs.title,
      parent: p.tag,
      text: plain([p.description, meta, cs.problem && `${cs.problemLabel ?? 'The challenge'}: ${cs.problem}`, cs.solution && `The solution: ${cs.solution}`].filter(Boolean).join(' ')),
      keywords: [...keywords, ...Object.values(cs.metadata ?? {}).map(String)],
      target: { type: 'case-study', slug: p.slug },
    });
    for (const section of cs.sections ?? []) {
      if (!section.id) throw new Error(`Section "${section.title}" in ${p.id} has no id. Add an "id" (e.g. "${key}/short-name") in caseStudies.ts.`);
      const text = plain((section.items ?? []).map(itemText).filter(Boolean).join(' '));
      push({
        id: section.id,
        kind: 'section',
        title: section.title,
        parent: short,
        text: text || section.title,
        keywords,
        target: { type: 'case-study', slug: p.slug, anchor: section.id },
      });
    }
  }

  const about = (id: string, title: string, text: string, keywords: string[]) =>
    push({ id, kind: 'about', title, parent: 'About', text, keywords, target: { type: 'frame', frame: 'about', anchor: id } });

  push({
    id: 'about/intro',
    kind: 'about',
    title: src.hero.headline,
    text: `${src.hero.tagline}. ${src.hero.headline} ${src.hero.intro}`,
    keywords: ['introduction', 'who', 'product designer', 'design lead', 'London'],
    target: { type: 'frame', frame: 'hero' },
  });
  about('about/bio', 'About Me', `${src.about.bio} "${src.about.quote}"`, ['background', 'approach', 'philosophy']);
  about('about/impact', 'Impact', src.stats.map((s) => `${s.category}: ${s.value} ${s.label}.`).join(' '), ['results', 'metrics', 'numbers', 'achievements']);
  about('about/principles', 'Design philosophy', src.principles.map((p) => `${p.title}: ${p.body}`).join(' '), ['principles', 'values', 'how he works']);
  about(
    'about/experience',
    "Where I've worked",
    src.experience.map((e) => `${e.role} at ${e.company} (${e.years}).`).join(' '),
    ['experience', 'career', 'jobs', 'roles', 'employers', 'current role', 'CV'],
  );

  for (const l of src.leadership) {
    push({ id: l.searchId, kind: 'leadership', title: l.title, parent: 'Leadership', text: l.description, keywords: l.keywords, target: { type: 'frame', frame: 'leadership', anchor: l.searchId }, url: l.iframeUrl });
  }
  push({
    id: 'leadership/recognition',
    kind: 'leadership',
    title: 'Recognition',
    parent: 'Leadership',
    text: src.achievements.map((a) => `${a.title}: ${a.detail} (${a.year}).`).join(' '),
    keywords: ['awards', 'Global Talent', 'Tech Nation', 'visa', 'UK', 'speaker', 'Young CISO', 'endorsement', 'exceptional talent'],
    target: { type: 'frame', frame: 'leadership', anchor: 'leadership/recognition' },
  });

  const c = src.contact;
  const contact = (id: string, title: string, text: string, keywords: string[], url: string) =>
    push({ id, kind: 'contact', title, parent: 'Contact', text, keywords, target: { type: 'frame', frame: 'contact', anchor: id }, url });
  contact('contact/email', 'Email', `${c.intro} Email Tobi at ${c.email}.`, ['email', 'mail', 'hire', 'work together', c.email], `mailto:${c.email}`);
  contact('contact/linkedin', 'LinkedIn', 'Connect with Tobi on LinkedIn.', ['linkedin', 'social', 'connect'], c.linkedin);
  contact('contact/cv', 'Download CV', "Download Tobi's full CV as a PDF.", ['cv', 'resume', 'download', 'pdf'], src.resumeUrl);
  contact('contact/behance', 'Behance', "More of Tobi's visual work on Behance.", ['behance', 'visual', 'portfolio', 'shots'], c.behance);
  contact('contact/webbie', 'Webbie', "Tobi's Webbie profile.", ['webbie', 'profile'], c.webbie);

  // The CV: searchable text from the PDF. Jumps go to "Where I've worked"; "Open" downloads the PDF.
  const cv = (id: string, title: string, text: string, keywords: string[]) =>
    push({ id, kind: 'cv', title, parent: 'CV', text, keywords: ['cv', 'resume', ...keywords], target: { type: 'frame', frame: 'about', anchor: 'about/experience' }, url: src.resumeUrl });
  cv('cv/summary', 'Professional summary', src.cv.summary, ['summary', 'profile', 'overview', 'years', 'experience']);
  cv('cv/skills', 'Skills and tools', src.cv.skills, ['skills', 'tools', 'software', 'figma', 'stack']);
  for (const r of src.cv.roles) {
    cv(`cv/role-${r.id}`, `${r.role}, ${r.company}`, `${r.role} at ${r.company}, ${r.place}, ${r.dates}. ${r.points.join(' ')}`, ['experience', 'job', 'role', r.company]);
  }
  cv('cv/education', 'Education', src.cv.education, ['education', 'degree', 'university', 'masters', 'msc', 'bsc', 'study']);
  cv('cv/certifications', 'Certifications', src.cv.certifications, ['certifications', 'courses', 'qualifications']);
  cv('cv/achievements', 'Key achievements', src.cv.achievements, ['achievements', 'awards']);

  return docs;
}

/** Fails loudly on anything that would break links or saved answers. */
export function validateDocs(docs: SearchDoc[], prewrittenLinks: Array<{ id: string; links: string[] }>, slugs: string[]): void {
  const ids = new Set<string>();
  for (const d of docs) {
    if (ids.has(d.id)) throw new Error(`Duplicate search id: ${d.id}`);
    ids.add(d.id);
    if (!d.text.trim()) throw new Error(`Empty search doc: ${d.id}`);
    if (d.target.type === 'case-study' && !slugs.includes(d.target.slug)) throw new Error(`Unknown slug in ${d.id}: ${d.target.slug}`);
  }
  for (const pa of prewrittenLinks) {
    for (const link of pa.links) if (!ids.has(link)) throw new Error(`Prewritten answer ${pa.id} links to missing id ${link}`);
  }
}
