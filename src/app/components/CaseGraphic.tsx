import { ArrowRight, ArrowDown } from 'lucide-react';

// Lightweight infographics for case studies, so key ideas scan without reading paragraphs.

const TAGS: Record<string, string> = {
  adapt: 'bg-amber-50 text-amber-800 border-amber-200',
  new: 'bg-blue-50 text-blue-800 border-blue-200',
  decide: 'bg-purple-50 text-purple-800 border-purple-200',
  accent: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
};

const Tag = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${TAGS[tone] || TAGS.neutral}`}>
    {children}
  </span>
);

const Caption = ({ text }: { text?: string }) =>
  text ? <p className="text-xs text-gray-500 mt-3">{text}</p> : null;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 rounded-2xl border border-gray-200 bg-[#FAFAFA] p-4 md:p-6">{children}</div>
);

export function CaseGraphic({ item }: { item: any }) {
  switch (item.graphic) {
    case 'stats':
      return (
        <Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
            {item.items.map((s: any, i: number) => (
              <div key={i} className="bg-white p-4">
                <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    case 'cards':
      return (
        <Box>
          <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 ${item.columns === 3 ? 'lg:grid-cols-3' : item.columns === 4 ? 'lg:grid-cols-4' : ''}`}>
            {item.items.map((c: any, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                {c.tag && <div className="mb-2"><Tag tone={c.tone || 'neutral'}>{c.tag}</Tag></div>}
                <div className="font-semibold text-gray-900 text-[15px]">{c.title}</div>
                {c.text && <div className="text-[13px] text-gray-600 mt-1 leading-relaxed">{c.text}</div>}
              </div>
            ))}
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    case 'flow':
      return (
        <Box>
          <div className="flex flex-col md:flex-row md:items-stretch gap-2">
            {item.steps.map((s: any, i: number) => (
              <div key={i} className="contents">
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4">
                  <div className="text-[11px] font-semibold text-gray-400 mb-1">{String(i + 1).padStart(2, '0')}</div>
                  <div className="font-semibold text-gray-900 text-[15px]">{s.title}</div>
                  {s.text && <div className="text-[13px] text-gray-600 mt-1 leading-relaxed">{s.text}</div>}
                </div>
                {i < item.steps.length - 1 && (
                  <div className="flex items-center justify-center text-gray-400">
                    <ArrowRight size={18} className="hidden md:block" />
                    <ArrowDown size={18} className="md:hidden" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    case 'compare':
      return (
        <Box>
          <div className="grid grid-cols-[1fr_1fr] gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200 text-[13px]">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-900">{item.left}</div>
            <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-900">{item.right}</div>
            {item.rows.map((r: string[], i: number) => (
              <div key={i} className="contents">
                <div className="bg-white px-4 py-3 text-gray-700">{r[0]}</div>
                <div className="bg-white px-4 py-3 text-gray-700">{r[1]}</div>
              </div>
            ))}
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    case 'mapping':
      return (
        <Box>
          <div className="space-y-2">
            {item.rows.map((r: any, i: number) => (
              <div key={i} className="grid grid-cols-[1fr_72px_1fr] items-center gap-2 md:gap-4">
                <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 text-[13px] font-medium text-gray-900">{r.from}</div>
                <div className="flex flex-col items-center gap-1">
                  <Tag tone={r.tone}>{r.tag}</Tag>
                  <ArrowRight size={14} className="text-gray-400" />
                </div>
                <div className={`rounded-lg px-3 py-2 text-[13px] font-medium ${r.pending ? 'border border-dashed border-gray-300 text-gray-500' : 'bg-white border border-gray-200 text-gray-900'}`}>{r.to}</div>
              </div>
            ))}
          </div>
          {item.legend && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-600">
              {item.legend.map((l: any, i: number) => (
                <span key={i} className="flex items-center gap-2"><Tag tone={l.tone}>{l.tag}</Tag>{l.text}</span>
              ))}
            </div>
          )}
          <Caption text={item.caption} />
        </Box>
      );

    case 'chips':
      return (
        <Box>
          {item.title && <div className="font-semibold text-gray-900 text-[15px] mb-3">{item.title}</div>}
          <div className="flex flex-wrap gap-2">
            {item.chips.map((c: string, i: number) => (
              <span key={i} className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[13px] text-gray-800">{c}</span>
            ))}
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    case 'branch':
      return (
        <Box>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:w-40 text-center">
              <div className="font-semibold text-gray-900 text-[14px]">{item.start}</div>
            </div>
            <ArrowRight size={18} className="hidden md:block text-gray-400 shrink-0" />
            <div className="bg-white rounded-xl border-2 border-gray-900 p-4 md:w-52 text-center">
              <div className="font-semibold text-gray-900 text-[14px]">{item.question}</div>
            </div>
            <ArrowRight size={18} className="hidden md:block text-gray-400 shrink-0" />
            <div className="flex-1 grid gap-2">
              {item.outcomes.map((o: any, i: number) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 flex items-start gap-3">
                  <Tag tone={o.tone || 'neutral'}>{o.label}</Tag>
                  <div>
                    <div className="font-semibold text-gray-900 text-[14px]">{o.title}</div>
                    {o.text && <div className="text-[13px] text-gray-600">{o.text}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Caption text={item.caption} />
        </Box>
      );

    default:
      return null;
  }
}
