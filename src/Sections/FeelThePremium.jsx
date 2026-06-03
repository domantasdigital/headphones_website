import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeelThePremium = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      "body",
      { backgroundColor: "#faf8f7" },
      {
        backgroundColor: "#120805",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  return (
    <div className="  bg-grey-900">
      <div ref={sectionRef} className="  max-w-425 mx-auto ">
        <h1
          ref={headingRef}
          className="text-grey-100 text-[25px] sm:text-[40px]  md:text-[60px] lg:text-[80px] mt-22.5 ml-5 sm:ml-10 md:ml-20 lg:ml-25 mb-2 "
        >
          FEEL THE <br /> PREEEMIUM.
        </h1>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Assets/feelPrem1.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default FeelThePremium;
