export interface Achievement {
  id: string;
  title: string;
  detail: string;
  year: string;
  logoKey: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'global-talent', title: 'Exceptional Talent', detail: 'UK Global Talent endorsement in digital technology', year: 'Gov.uk', logoKey: 'tech-nation' },
  { id: 'ux-scotland', title: 'Invited Speaker', detail: 'AI for accessible design systems with variables', year: 'UX Scotland 2025', logoKey: 'ux-scotland' },
  { id: 'young-ciso', title: 'Finalist', detail: 'Young CISO Award, leadership across design, tech and security', year: '2021', logoKey: 'young-ciso' },
];
