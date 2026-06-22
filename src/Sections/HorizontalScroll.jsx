import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HORIZONTAL_SCROLL_PRELOAD_EXTRA = 1000;
export const HORIZONTAL_SCROLL_VERTICAL_PRELOAD_EXTRA = 3000;
export const HORIZONTAL_SCROLL_TEXT_SELECTOR = "[data-horizontal-scroll-text]";

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;

      if (!section || !text) return undefined;

      const mm = gsap.matchMedia();
      const getMoveDistance = () =>
        Math.max(0, text.scrollWidth - window.innerWidth);
      const getScrollDistance = () => Math.max(1, getMoveDistance());
      let isKilled = false;
      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

      document.fonts?.ready.then(() => {
        if (!isKilled) ScrollTrigger.refresh();
      });

      mm.add("(min-width: 768px)", () => {
        gsap.to(text, {
          x: () => -getMoveDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        isKilled = true;
        cancelAnimationFrame(refreshFrame);
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-screen items-center overflow-hidden bg-[#0e0c0a] text-grey-100 md:flex"
    >
      <div className="pointer-events-none absolute inset-0 " />

      <div
        ref={textRef}
        data-horizontal-scroll-text
        className="relative z-10 w-max pl-[5vw] pr-[20vw]"
      >
        <h1 className="whitespace-nowrap text-[clamp(72px,18vw,400px)] font-black leading-[0.82] tracking-[-0.08em] text-grey-100">
          AMIRON <span className="text-orange-500">WIRELESS</span> HEADPHONES
        </h1>
      </div>
    </section>
  );
};

export default HorizontalScroll;
