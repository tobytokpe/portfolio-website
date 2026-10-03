export interface Stat {
  id: string;
  value: string;
  label: string;
  category: string;
  slug?: string;
}

export const STATS: Stat[] = [
  { id: 'banks', value: '500+', label: 'banks on one platform', category: 'Scale', slug: 'Qore' },
  { id: 'launch', value: '4 mo → 1 day', label: "to launch a bank's app", category: 'Speed', slug: 'Qore' },
  { id: 'investnow', value: '11th → 3rd', label: 'in its market, in three months', category: 'Growth' },
  { id: 'dropoff', value: '48% → 14%', label: 'onboarding drop-off', category: 'Conversion', slug: 'Moore' },
  { id: 'cewers', value: '95s → 4s', label: 'emergency report time, UNDP', category: 'Life', slug: 'UNDP' },
  { id: 'downloads', value: '8,000+', label: 'organic downloads, no paid marketing', category: 'Adoption', slug: 'Moore' },
];
