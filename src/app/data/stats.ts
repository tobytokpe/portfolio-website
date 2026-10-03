/* Proof-forward stats, sourced from CV + LinkedIn profile (cross-referenced). */

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { id: 'banks', value: '500+', label: 'microfinance banks scaled on one core banking platform' },
  { id: 'cewers', value: '95s → 4s', label: 'emergency report time, CEWERS for the UNDP' },
  { id: 'investnow', value: '11th → 3rd', label: 'most-used investment app in its market, in 3 months' },
  { id: 'dropoff', value: '62% → 19%', label: 'registration drop-off, cross-border investment platform' },
  { id: 'coached', value: '10+', label: 'designers coached into leadership roles of their own' },
  { id: 'lending', value: '40%', label: 'faster loan processing, origination to repayment' },
];
