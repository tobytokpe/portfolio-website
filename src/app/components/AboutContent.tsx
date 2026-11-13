import { Download } from 'lucide-react';
import { StatStrip } from './StatStrip';
import { PrincipleCards } from './PrincipleCards';
import { CareerRail } from './CareerRail';
import { ABOUT_BIO, ABOUT_QUOTE, RESUME_URL } from '../data/site';

export { RESUME_URL };

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{children}</h3>
  );
}

export function AboutContent() {
  return (
    <div className="space-y-12">
      <div className="space-y-6" data-search-id="about/bio">
        <p className="text-gray-600 leading-relaxed font-[Architects_Daughter]">
          {ABOUT_BIO}
        </p>
        <blockquote className="border-l-4 border-gray-900 pl-5">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>
            "{ABOUT_QUOTE}"
          </p>
        </blockquote>
      </div>

      <div data-search-id="about/impact">
        <SubHeading>Impact</SubHeading>
        <StatStrip />
      </div>

      <div data-search-id="about/principles">
        <SubHeading>Design philosophy</SubHeading>
        <PrincipleCards />
      </div>

      <div data-search-id="about/experience">
        <SubHeading>Where I've worked</SubHeading>
        <CareerRail />
        <a
          href={RESUME_URL}
          download
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <Download size={18} />
          Download full CV
        </a>
      </div>
    </div>
  );
}
