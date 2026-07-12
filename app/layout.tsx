import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://oluwatobi.cc'),
  title: {
    template: '%s | Tobi Olowu',
    default: 'Tobi Olowu — Product Designer, London',
  },
  description:
    'Product designer with a decade of experience in fintech, SaaS, and social impact. Based in London. Global Talent UK endorsed.',
  keywords: [
    'Product Designer London',
    'UX Designer London',
    'Fintech Designer',
    'SaaS Designer',
    'Portfolio',
    'Tobi Olowu',
    'Oluwatobi Olowu',
    'Product Designer Portfolio',
    'UI UX Designer London',
    'Global Talent UK',
  ],
  authors: [{ name: 'Tobi Olowu', url: 'https://oluwatobi.cc' }],
  creator: 'Tobi Olowu',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://oluwatobi.cc',
    siteName: 'Tobi Olowu — Product Designer',
    title: 'Tobi Olowu — Product Designer, London',
    description:
      'Product designer with a decade of experience in fintech, SaaS, and social impact. Based in London.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Tobi Olowu — Product Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tobi Olowu — Product Designer, London',
    description:
      'Product designer with a decade of experience in fintech, SaaS, and social impact.',
    creator: '@tobiolowu',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://oluwatobi.cc',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tobi Olowu',
  alternateName: 'Oluwatobi Olowu',
  jobTitle: 'Product Designer',
  description:
    'Product designer with a decade of experience in fintech, SaaS, and social impact. Based in London. Global Talent UK endorsed.',
  url: 'https://oluwatobi.cc',
  image: 'https://oluwatobi.cc/og-default.png',
  sameAs: ['https://www.linkedin.com/in/olowutobi/'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  knowsAbout: [
    'Product Design',
    'UX Design',
    'UI Design',
    'Fintech',
    'SaaS',
    'Design Systems',
    'User Research',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
