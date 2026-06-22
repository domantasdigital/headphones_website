import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;

      const getScrollAmount = () => {
        return -Math.max(text.scrollWidth - section.offsetWidth, 0);
      };

      const tween = gsap.to(text, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-[#0e0c0a] flex items-center"
    >
      <h2
        ref={textRef}
        className="w-fit flex flex-nowrap whitespace-nowrap text-[clamp(4rem,16vw,18rem)] leading-none font-black tracking-[-0.08em] text-grey-100"
      >
        <span className="flex-shrink-0 pr-[0.18em]">AMIRON</span>
        <span className="flex-shrink-0 pr-[0.18em] text-orange-500">
          WIRELESS
        </span>
        <span className="flex-shrink-0">HEADPHONES</span>
      </h2>
    </section>
  );
};

export default HorizontalScroll;
