import { Download } from 'lucide-react';
import { StatStrip } from './StatStrip';
import { PrincipleCards } from './PrincipleCards';
import { CareerRail } from './CareerRail';

export const RESUME_URL = '/resume/Tobi-Olowu-CV.pdf';

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{children}</h3>
  );
}

export function AboutContent() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed font-[Architects_Daughter]">
          A decade into product design, the thread running through my work isn't one industry or one kind of interface. It's a habit of taking something genuinely complicated and making it usable without flattening the complexity that actually matters.
        </p>
        <blockquote className="border-l-4 border-gray-900 pl-5">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>
            "I'd rather ship something slightly rough and fix it in the open than wait for a version that never ships at all."
          </p>
        </blockquote>
      </div>

      <div>
        <SubHeading>Impact</SubHeading>
        <StatStrip />
      </div>

      <div>
        <SubHeading>How I work</SubHeading>
        <PrincipleCards />
      </div>

      <div>
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
