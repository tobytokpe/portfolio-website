export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  years: string;
  logoKey: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  { id: 'woodmac', role: 'Senior Product Designer, Lead Platform & AI', company: 'Wood Mackenzie', years: '2023 — Now', logoKey: 'wood-mackenzie' },
  { id: 'cvspan', role: 'Head of Design', company: 'CVSpan', years: '2021 — 2023', logoKey: 'cvspan' },
  { id: 'cousant', role: 'Software UI/UX Consultant', company: 'Cousant Technologies', years: '2018 — 2021', logoKey: 'cousant' },
];
