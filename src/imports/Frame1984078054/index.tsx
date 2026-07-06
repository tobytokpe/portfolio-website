import svgPaths from "./svg-q9qsoebsed";
import imgOluwatobi2 from "./f3f35b7a6790541de22042d57017d5ec284cae1b.png";

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="relative rounded-[526.697px] shrink-0 size-[38.462px]" data-name="Oluwatobi 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[526.697px] size-full" src={imgOluwatobi2} />
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