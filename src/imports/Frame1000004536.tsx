import svgPaths from "./svg-cugkegpeok";
import imgOluwatobi2 from "figma:asset/f3f35b7a6790541de22042d57017d5ec284cae1b.png";

function Dot() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Content">
      <Dot />
      <p className="font-['Gilmer:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#344054] text-[12px] text-center">Portfolio</p>
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center pl-[6px] pr-[8px] py-[3px] relative rounded-[8px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Content />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex gap-[11.538px] items-center px-[16.154px] py-[10.769px] relative rounded-[16px] shadow-[0px_2.154px_4.308px_0px_rgba(0,0,0,0.15),0px_0.538px_1.615px_0px_rgba(0,0,0,0.3)] shrink-0">
      <div className="relative rounded-[526.697px] shrink-0 size-[38.462px]" data-name="Oluwatobi 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[526.697px] size-full" src={imgOluwatobi2} />
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[19.231px] text-black">Tobi, Olowu</p>
      <Tag />
    </div>
  );
}

function Estate() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="estate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="uil-at">
          <path d={svgPaths.p1afd0e80} fill="var(--fill-0, #2F3853)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2f3853] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Share</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2f3853] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex gap-[25px] h-[60px] items-center px-[20px] py-[10.769px] relative rounded-[16px] shadow-[0px_2.154px_4.308px_0px_rgba(0,0,0,0.15),0px_0.538px_1.615px_0px_rgba(0,0,0,0.3)] shrink-0">
      <Estate />
      <UilUserSquare />
      <UilBriefcaseAlt />
      <UilBookReader />
      <UilAt />
      <Button />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
      <Frame1 />
      <Frame2 />
    </div>
  );
}