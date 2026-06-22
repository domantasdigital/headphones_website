import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Components/Button";
import TeslaModal from "../Components/TeslaModal";
import {
  HORIZONTAL_SCROLL_PRELOAD_EXTRA,
  HORIZONTAL_SCROLL_TEXT_SELECTOR,
} from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const Tesla = () => {
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const hasLoadedVideoRef = useRef(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount first, then trigger open so refs exist
  const handleOpen = () => {
    setMounted(true);
    requestAnimationFrame(() => setModalOpen(true));
  };

  // Close → let animation finish → unmount
  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => setMounted(false), 500); // match timeline duration
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return undefined;

    let observer;
    let isKilled = false;

    const getHorizontalScrollDistance = () => {
      const horizontalText = document.querySelector(
        HORIZONTAL_SCROLL_TEXT_SELECTOR,
      );

      if (!horizontalText) return window.innerHeight;

      return Math.max(0, horizontalText.scrollWidth - window.innerWidth);
    };

    const getRootMargin = () => {
      const margin = Math.ceil(
        getHorizontalScrollDistance() + HORIZONTAL_SCROLL_PRELOAD_EXTRA,
      );

      return `0px 0px ${margin}px 0px`;
    };

    const loadVideo = () => {
      if (hasLoadedVideoRef.current) return;

      video.preload = "auto";
      video.load();
      video.play().catch(() => {});
      hasLoadedVideoRef.current = true;
      observer?.disconnect();
    };

    const createObserver = () => {
      if (isKilled || hasLoadedVideoRef.current) return;

      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            loadVideo();
          }
        },
        { rootMargin: getRootMargin() },
      );

      observer.observe(section);
    };

    const observerFrame = requestAnimationFrame(createObserver);
    const handleResize = () => createObserver();

    window.addEventListener("resize", handleResize);
    document.fonts?.ready.then(createObserver);

    return () => {
      isKilled = true;
      cancelAnimationFrame(observerFrame);
      window.removeEventListener("resize", handleResize);
      observer?.disconnect();
    };
  }, []);

  useGSAP(() => {
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
          toggleActions: "play ",
        },
      },
    );

    // Button animation
    const btn = btnRef.current;
    const text = btn.querySelector("span");
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      // Just make sure it's fully visible, no animation
      gsap.set(btn, { opacity: 1, scale: 1, y: 0 });
      gsap.set(text, { opacity: 1 });
      return;
    }

    gsap.set(btn, {
      width: 40,
      height: 40,
      minWidth: 0,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      opacity: 0.6,
      scale: 0,
      y: -100,
    });

    gsap.set(text, { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
      })
      .to(btn, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 5,
        ease: "power2.out",
      })
      .to(btn, {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        borderRadius: "6px",
        paddingLeft: 24,
        paddingRight: 24,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(text, { opacity: 1, duration: 0.7, ease: "power2.inOut" });
  });

  return (
    <div ref={sectionRef} className=" lg:min-h-screen bg-[#0e0c0a]">
      {mounted && <TeslaModal isOpen={modalOpen} onClose={handleClose} />}
      <div className="  max-w-480 mx-auto  lg:min-h-screen">
        <h1
          ref={headingRef}
          className="text-grey-100 text-[25px] sm:text-[40px]  md:text-[60px] lg:text-[80px] mt-22.5 ml-5 sm:ml-10 md:ml-20 lg:ml-25  mb-12 "
        >
          BEHOLD THE <br /> TESLA TECHNOLOGY.
        </h1>
        <div className="relative aspect-video w-full overflow-hidden lg:-translate-y-15 mb-4">
          <video
            ref={videoRef}
            preload="none"
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/Assets/Tesla11.webm" type="video/webm" />
          </video>
        </div>
        <div className="flex flex-center mx-5  md:mx-0    ">
          <Button ref={btnRef} onClick={handleOpen} variant="fullGlass">
            Learn more about tesla technology
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tesla;
