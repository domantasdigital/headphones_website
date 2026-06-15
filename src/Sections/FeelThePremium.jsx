import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeelThePremium = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const video = videoRef.current;
          video.preload = "auto";
          video.load();
          video.play();
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Background color animation
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        gsap.fromTo(
          "body",
          { backgroundColor: "#faf8f7" },
          {
            backgroundColor: "#0e0c0a",
            immediateRender: false,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isMobile ? "top 40%" : "top 80%",
              end: isMobile ? "top 60%" : "top 60%",
              scrub: 1,
            },
          },
        );
      },
    );

    // Heading animation (consistent for all devices)
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
    <div className="  bg-[#0e0c0a]">
      <div ref={sectionRef} className="  max-w-425 mx-auto ">
        <h1
          ref={headingRef}
          className="text-grey-100 text-[25px] sm:text-[40px]  md:text-[60px] lg:text-[80px] mt-22.5 ml-5 sm:ml-10 md:ml-20 lg:ml-25 mb-2 "
        >
          FEEL THE <br /> PREEEMIUM.
        </h1>
        <video
          ref={videoRef}
          preload="none"
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Assets/feelPrem5.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default FeelThePremium;
