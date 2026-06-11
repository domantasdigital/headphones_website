import Button from "../Components/Button";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TestingSec = () => {
  const btnRef = useRef(null);

  useGSAP(() => {
    const btn = btnRef.current;
    const text = btn.querySelector("span");

    gsap.set(btn, {
      width: 40,
      height: 40,
      minWidth: 0,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      opacity: 0.6,
      scale: 0.08,
      y: -1500,
    });

    gsap.set(text, { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: btn,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to(btn, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(btn, {
        width: "auto",
        height: "auto",
        minWidth: "auto", // restore it
        borderRadius: "6px",
        paddingLeft: 24,
        paddingRight: 24,
        duration: 0.7,
        ease: "expo.out",
      })
      .to(text, { opacity: 1, duration: 0.4, ease: "power2.out" });
  });

  return (
    <div className="bg-grey-900 min-h-300 flex flex-center">
      <Button ref={btnRef} variant="fullGlass">
        Learn more
      </Button>
    </div>
  );
};

export default TestingSec;
