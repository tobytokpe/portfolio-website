import type { SearchDoc } from './types.js';
import { MAX_DOC_WORDS } from './indexConfig.js';
import type { SiteLeadership, SiteProject } from '../data/site.js';

export interface DocSources {
  caseStudies: Record<string, any>;
  projects: SiteProject[];
  leadership: SiteLeadership[];
  heroIntro: string;
  aboutBio: string;
  globalTalent: { label: string; text: string };
  designJourney: string;
  contact: { email: string; linkedin: string; webbie: string; behance: string };
}

/** Extra words people search with that the copy itself doesn't always use. */
const PROJECT_KEYWORDS: Record<string, string[]> = {
  hydra: ['API gateway', 'B2B', 'SaaS', 'developer dashboard', 'billing', 'Qore Technologies', 'enterprise'],
  qore: ['white-label', 'multi-tenant', 'microfinance', 'no-code', 'Africa', 'design tokens', 'Qore Technologies'],
  mamvest: ['wealth management', 'investment', 'mutual funds', 'SEC', 'Mango Asset Management', 'service blueprint'],
  moore: ['onboarding', 'payments', 'startup', 'founding designer', 'seed round', 'mobile banking'],
  undp: ['United Nations', 'CEWERS', 'humanitarian', 'crisis', 'early warning', 'Nigeria', 'voice', 'panic button'],
  'signature-bank': ['website', 'tier 1 bank', 'Nigeria'],
};

export const plain = (text: string) => text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

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
    const key = p.searchKey;
    const short = p.title.split(':')[0].trim();
    const keywords = [p.tag, ...(PROJECT_KEYWORDS[key] ?? [])];
    if (p.external) {
      push({
        id: `${key}/overview`,
        kind: 'case-study',
        title: p.title,
        text: p.description,
        keywords,
        target: { type: 'external', url: p.iframeUrl },
        url: p.iframeUrl,
      });
      continue;
    }
    const cs = src.caseStudies[p.id];
    if (!cs) throw new Error(`No case study data for ${p.id}`);
    const meta = Object.entries(cs.metadata ?? {})
      .map(([k, v]) => `${k}: ${v}.`)
      .join(' ');
    push({
      id: `${key}/overview`,
      kind: 'case-study',
      title: cs.title,
      parent: p.tag,
      text: plain([p.description, meta, cs.problem && `The challenge: ${cs.problem}`, cs.solution && `The solution: ${cs.solution}`].filter(Boolean).join(' ')),
      keywords: [...keywords, ...Object.values(cs.metadata ?? {}).map(String)],
      target: { type: 'case-study', slug: p.slug },
    });
    for (const section of cs.sections ?? []) {
      if (!section.id) throw new Error(`Section "${section.title}" in ${p.id} has no id`);
      const text = plain(
        (section.items ?? [])
          .map((item: any) => {
            if (item.type === 'paragraph' || item.type === 'subheading' || item.type === 'cta') return item.text;
            return '';
          })
          .filter(Boolean)
          .join(' '),
      );
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

  push({ id: 'about/intro', kind: 'about', title: "Hi, I'm Tobi Olowu", text: src.heroIntro, keywords: ['introduction', 'who', 'product designer'], target: { type: 'frame', frame: 'hero' } });
  push({ id: 'about/bio', kind: 'about', title: 'About Me', text: src.aboutBio, keywords: ['experience', 'background', 'years', 'industries', 'biography'], target: { type: 'frame', frame: 'about', anchor: 'about/bio' } });
  push({ id: 'about/global-talent', kind: 'about', title: src.globalTalent.label, text: src.globalTalent.text, keywords: ['Tech Nation', 'visa', 'UK', 'award', 'endorsement', 'exceptional talent'], target: { type: 'frame', frame: 'about', anchor: 'about/global-talent' } });
  push({ id: 'about/journey', kind: 'about', title: 'My design journey', text: src.designJourney, keywords: ['education', 'university', 'school', 'story', 'how he started'], target: { type: 'frame', frame: 'about', anchor: 'about/journey' } });

  for (const l of src.leadership) {
    push({
      id: l.searchId,
      kind: 'leadership',
      title: l.title,
      parent: 'Leadership',
      text: l.description,
      keywords: l.keywords,
      target: { type: 'frame', frame: 'leadership', anchor: l.searchId },
      url: l.iframeUrl,
    });
  }

  const c = src.contact;
  const contactIntro = 'Interested in working together? Feel free to reach out through any of these channels.';
  push({ id: 'contact/email', kind: 'contact', title: 'Email', parent: 'Contact', text: `${contactIntro} Email Tobi at ${c.email}.`, keywords: ['email', 'mail', 'hire', 'work together', c.email], target: { type: 'frame', frame: 'contact', anchor: 'contact/email' }, url: `mailto:${c.email}` });
  push({ id: 'contact/linkedin', kind: 'contact', title: 'LinkedIn', parent: 'Contact', text: 'Connect with Tobi on LinkedIn.', keywords: ['linkedin', 'social', 'connect'], target: { type: 'frame', frame: 'contact', anchor: 'contact/linkedin' }, url: c.linkedin });
  push({ id: 'contact/behance', kind: 'contact', title: 'Behance', parent: 'Contact', text: "More of Tobi's visual work on Behance.", keywords: ['behance', 'visual', 'portfolio', 'shots'], target: { type: 'frame', frame: 'contact', anchor: 'contact/behance' }, url: c.behance });
  push({ id: 'contact/webbie', kind: 'contact', title: 'Webbie', parent: 'Contact', text: "Tobi's Webbie profile.", keywords: ['webbie', 'profile'], target: { type: 'frame', frame: 'contact', anchor: 'contact/webbie' }, url: c.webbie });

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
