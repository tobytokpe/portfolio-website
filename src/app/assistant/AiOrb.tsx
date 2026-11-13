import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import aiLoaderLottie from "../../assets/lottie/ai-loader.json";

/**
 * The assistant's orb (src/assets/lottie/ai-loader.json, copied from Bespoka). `motion`:
 *  - "still": first frame only;
 *  - "hover": plays while the pointer is over its parent (pass `hovered`);
 *  - "loop": plays continuously (the start page, and while the assistant is answering).
 * The orb fills about three quarters of the Lottie canvas, so it's scaled up to fill its box.
 */
export function AiOrb({
  size,
  motion = "still",
  hovered = false,
  speed = 1,
  className = "",
}: {
  size: number;
  motion?: "still" | "hover" | "loop";
  hovered?: boolean;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const playing = motion === "loop" || (motion === "hover" && hovered);

  useEffect(() => {
    const anim = ref.current;
    if (!anim) return;
    anim.setSpeed(speed);
    if (playing) anim.play();
    else anim.goToAndStop(0, true);
  }, [playing, speed]);

  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie
        lottieRef={ref}
        animationData={aiLoaderLottie}
        loop
        autoplay={playing}
        className="absolute inset-0 h-full w-full scale-[1.38]"
      />
    </span>
  );
}
