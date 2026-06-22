import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const text = textRef.current;

      function getScrollAmount() {
        const textWidth = text.scrollWidth;
        return -(textWidth - window.innerWidth);
      }

      const tween = gsap.to(text, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 20%",
        end: () => `+=${getScrollAmount() * -1 + window.innerWidth * 0.08}`,
        pin: true,
        pinSpacing: true,
        animation: tween,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      className="h-screen overflow-hidden bg-[#0e0c0a] flex items-center"
    >
      <h2
        ref={textRef}
        className="w-fit flex flex-nowrap whitespace-nowrap text-[30vw] leading-none font-black tracking-[-0.08em] text-grey-100"
      >
        <span className="flex-shrink-0 px-[0.15em]">AMIRON</span>
        <span className="flex-shrink-0 px-[0.15em] text-orange-500">
          WIRELESS
        </span>
        <span className="flex-shrink-0 px-[0.15em]">HEADPHONES</span>
      </h2>
    </section>
  );
};

export default HorizontalScroll;
