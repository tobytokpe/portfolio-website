import { describe, it, expect } from 'vitest';
import { canonicalQuery, looksLikeQuestion, stem, answerKey, expandQuery } from '../normalise';
import { needsAi } from '../answerGate';
import { matchPrewritten } from '../prewritten';
import { buildDocs, validateDocs } from '../buildDocs';
import { search, findPrewritten } from '../engine';
import { PREWRITTEN_ANSWERS, STARTER_CHIPS } from '../../data/prewrittenAnswers';
import { CASE_STUDIES } from '../../data/caseStudies';
import { PROJECTS, LEADERSHIP, HERO_INTRO, ABOUT_BIO, GLOBAL_TALENT, DESIGN_JOURNEY, CONTACT } from '../../data/site';

const sources = {
  caseStudies: CASE_STUDIES,
  projects: PROJECTS,
  leadership: LEADERSHIP,
  heroIntro: HERO_INTRO,
  aboutBio: ABOUT_BIO,
  globalTalent: GLOBAL_TALENT,
  designJourney: DESIGN_JOURNEY,
  contact: CONTACT,
};

describe('normalise', () => {
  it('gives paraphrases the same cache identity', () => {
    expect(canonicalQuery("What's Tobi's design-system experience?")).toBe(canonicalQuery('design system experience'));
    expect(canonicalQuery('How do I EMAIL him')).toBe(canonicalQuery('contact'));
    expect(canonicalQuery('resume')).toBe(canonicalQuery('CV'));
  });

  it('builds the same key for the same question in any form', async () => {
    expect(await answerKey('Banking work?', 'v1')).toBe(await answerKey('banking work', 'v1'));
    expect(await answerKey('banking work', 'v1')).not.toBe(await answerKey('banking work', 'v2'));
  });

  it('stems lightly', () => {
    expect(stem('systems')).toBe('system');
    expect(stem('designing')).toBe('design');
    expect(stem('companies')).toBe('company');
    expect(stem('process')).toBe('process');
  });

  it('spots questions', () => {
    expect(looksLikeQuestion('How did he reduce drop-off at Moore')).toBe(true);
    expect(looksLikeQuestion('qore')).toBe(false);
    expect(looksLikeQuestion('design tokens?')).toBe(true);
  });

  it('expands synonyms', () => {
    expect(expandQuery('hire').split(' ')).toContain('contact');
  });
});

describe('needs-AI gate', () => {
  it('keeps lookups local', () => {
    expect(needsAi('qore', 5)).toBe('results');
    expect(needsAi('design tokens', 5)).toBe('results');
    expect(needsAi('hi', 5)).toBe('results');
  });
  it('sends real questions on', () => {
    expect(needsAi('How did Tobi reduce onboarding drop-off at Moore?', 5)).toBe('ask');
  });
  it('never asks with nothing to ground it', () => {
    expect(needsAi('What is the airspeed of a swallow?', 0)).toBe('results');
  });
});

describe('prewritten answers', () => {
  it('every chip points at an answer', () => {
    for (const chip of STARTER_CHIPS) expect(PREWRITTEN_ANSWERS.some((a) => a.id === chip.answerId)).toBe(true);
  });

  it('each stored question finds its own answer', () => {
    for (const a of PREWRITTEN_ANSWERS) {
      for (const q of a.questions) {
        const hit = matchPrewritten(q, PREWRITTEN_ANSWERS);
        if (hit) expect([a.id, q]).toEqual([hit.id, q]);
      }
    }
  });

  it('matches everyday phrasings', () => {
    expect(findPrewritten('Who is Tobi?')?.id).toBe('pa/who');
    expect(findPrewritten('how can I contact him')?.id).toBe('pa/contact');
    expect(findPrewritten('banking experience')?.id).toBe('pa/fintech');
    expect(findPrewritten('What is Hydra?')?.id).toBe('pa/hydra');
  });

  it('lets specific questions fall through', () => {
    expect(findPrewritten('How did he reduce onboarding drop-off at Moore?')).toBeNull();
    expect(findPrewritten('what colours did the UNDP app use for Benue')).toBeNull();
  });

  it('stays within 80 words', () => {
    for (const a of PREWRITTEN_ANSWERS) expect(a.answer.split(/\s+/).length, a.id).toBeLessThanOrEqual(80);
  });
});

describe('index content', () => {
  const docs = buildDocs(sources);

  it('is valid: unique ids, real links, known slugs', () => {
    expect(() => validateDocs(docs, PREWRITTEN_ANSWERS, PROJECTS.map((p) => p.slug))).not.toThrow();
  });

  it('covers every case study section with its stable id', () => {
    for (const p of PROJECTS.filter((x) => !x.external)) {
      for (const s of CASE_STUDIES[p.id].sections) expect(docs.some((d) => d.id === s.id)).toBe(true);
    }
  });

  it('rejects duplicates and broken links', () => {
    expect(() => validateDocs([...docs, docs[0]], [], PROJECTS.map((p) => p.slug))).toThrow(/Duplicate/);
    expect(() => validateDocs(docs, [{ id: 'x', links: ['nope/missing'] }], PROJECTS.map((p) => p.slug))).toThrow(/missing id/);
  });
});

describe('live search', () => {
  const top = (q: string) => search(q)[0]?.id;
  it('finds things by name', () => {
    expect(top('qore')).toMatch(/^qore\//);
    expect(top('global talent')).toBe('about/global-talent');
    expect(top('linkedin')).toBe('contact/linkedin');
    expect(top('panic button')).toBe('undp/panic-button');
  });
  it('handles typos and partial words', () => {
    expect(top('mamvst')).toMatch(/^mamvest\//);
    expect(search('onboard').some((r) => r.id === 'moore/onboarding')).toBe(true);
  });
  it('returns nothing for empty queries', () => {
    expect(search('the')).toEqual([]);
  });
});
