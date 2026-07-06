import svgPaths from "./svg-wp96zkcglb";
import imgOluwatobi2 from "./f3f35b7a6790541de22042d57017d5ec284cae1b.png";

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[8px]" data-name="_Dot">
        <div className="absolute left-px size-[6px] top-px" data-name="Dot">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <circle cx="3" cy="3" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Gilmer:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#344054] text-[12px] text-center whitespace-nowrap">Portfolio</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative rounded-[526.697px] shrink-0 size-[38.462px]" data-name="Oluwatobi 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[526.697px] size-full" src={imgOluwatobi2} />
      </div>
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-black whitespace-nowrap">Tobi, Olowu</p>
      <div className="bg-white content-stretch flex items-center justify-center pl-[6px] pr-[8px] py-[3px] relative rounded-[8px] shrink-0" data-name="Tag">
        <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Content />
      </div>
    </div>
  );
}

function Estate() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="estate">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="estate">
          <path d={svgPaths.pf5ee180} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function UilUserSquare() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="uil-user-square">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="uil-user-square">
          <path d={svgPaths.p2c529300} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function UilBriefcaseAlt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="uil-briefcase-alt">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="uil-briefcase-alt">
          <path d={svgPaths.p98eab00} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function UilBookReader() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="uil-book-reader">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="uil-book-reader">
          <path d={svgPaths.p10c81c40} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function UilAt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="uil-at">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="uil-at">
          <path d={svgPaths.p1afd0e80} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_2.154px_2.154px_rgba(0,0,0,0.1)] flex gap-[24px] items-center px-[20px] py-[16px] relative rounded-[16px] size-full">
      <Frame1 />
      <div className="flex h-[32px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[32px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 2">
                <line id="Line 203" stroke="var(--stroke-0, #C1C1C1)" strokeWidth="2" x2="32" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Estate />
      <UilUserSquare />
      <UilBriefcaseAlt />
      <UilBookReader />
      <UilAt />
    </div>
  );
}