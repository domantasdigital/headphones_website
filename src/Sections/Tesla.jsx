import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Components/Button";
import TeslaModal from "../Components/TeslaModal";

gsap.registerPlugin(ScrollTrigger);

const Tesla = () => {
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const video = useRef(null);

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

    gsap.set(btn, {
      width: 40,
      height: 40,
      minWidth: 0,
      borderRadius: "50%",
      paddingLeft: 0,
      paddingRight: 0,
      opacity: 0.6,
      scale: 0,
      y: -200,
    });

    gsap.set(text, { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: video.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
      })
      .to(btn, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "ease",
      })
      .to(btn, {
        width: "auto",
        height: "auto",
        minWidth: "auto", // restore it
        borderRadius: "6px",
        paddingLeft: 24,
        paddingRight: 24,
        duration: 1,
        ease: "ease",
      })
      .to(text, { opacity: 1, duration: 0.4, ease: "power2.out" });
  });

  return (
    <div className=" lg:min-h-screen bg-grey-900">
      {mounted && <TeslaModal isOpen={modalOpen} onClose={handleClose} />}
      <div className="  max-w-425 mx-auto  lg:min-h-screen">
        <h1
          ref={headingRef}
          className="text-grey-100 text-[25px] sm:text-[40px]  md:text-[60px] lg:text-[80px] mt-22.5 ml-5 sm:ml-10 md:ml-20 lg:ml-25  "
        >
          BEHOLD THE <br /> TESLA TECHNOLOGY.
        </h1>
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover md:-translate-y-15"
        >
          <source src="/Assets/Tesla.webm" type="video/webm" />
        </video>
        <div className="flex flex-center mx-5  md:mx-0  md:-translate-y-22 lg:-translate-y-35  ">
          <Button ref={btnRef} onClick={handleOpen} variant="fullGlass">
            Learn more about tesla technology
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tesla;
