import "../CSS for specific sections/TeslaCss.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TeslaModal = ({ isOpen, onClose }) => {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const openTl = useRef(null);
  const closeTl = useRef(null);
  const hasOpened = useRef(false);

  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);
  const fifthText = useRef(null);
  const sixthText = useRef(null);

  useGSAP(() => {
    const textEls = [
      firstText.current,
      secondText.current,
      thirdText.current,
      fourthText.current,
      fifthText.current,
      sixthText.current,
    ];

    openTl.current = gsap
      .timeline({ paused: true })
      .set(panelRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        backdropFilter: "blur(0px)",
      })
      .set(textEls, { opacity: 0, y: 20 })
      .to(backdropRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(panelRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      })
      .to(panelRef.current, {
        backdropFilter: "blur(40px)",
        duration: 2,
        ease: "power2.out",
      })
      .to(
        textEls,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.1 },
        "-=1.5",
      );

    closeTl.current = gsap
      .timeline({ paused: true })
      // fade all text at once, no stagger, very fast
      .to(textEls, { opacity: 0, y: 20, duration: 0.15, ease: "power2.in" })
      // panel and backdrop fade together right after
      .to(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96, duration: 0.35, ease: "power3.in" },
        "<0.05",
      )
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<0.1",
      );
  }, []);

  useGSAP(() => {
    if (!openTl.current || !closeTl.current) return;
    if (isOpen) {
      hasOpened.current = true;
      closeTl.current.pause(0); // reset close timeline
      openTl.current.restart(); // restart from beginning
    } else {
      if (!hasOpened.current) return;
      openTl.current.pause(); // pause open timeline wherever it is
      closeTl.current.restart(); // restart close from beginning
    }
  }, [isOpen]);

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      className="backdropBackground mt-7 "
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="backdrop flex  flex-col flex-center w-[90vw] lg:w-[90vw] 2xl:w-[70vw]  max-w-300 min-h-[85vh]"
      >
        <button onClick={onClose} className="close-btn">
          ✕
        </button>
        <h1
          ref={firstText}
          className=" text-[clamp(25px,8vw,50px)] text-grey-100 text-center"
        >
          TESLA TECHNOLOGY
        </h1>
        <p
          ref={secondText}
          className="text-[clamp(15px,4vw,20px)] text-center text-grey-100 font-medium! leading-[130%]! tracking-[-0.01em]! font-d mt-2"
        >
          The Acoustic Engine of Pure Emotion.
        </p>
        <h3
          ref={thirdText}
          className=" text-center font-mono text-grey-100 text-[clamp(20px,2vw,25px)]  mt-20 md:mt-25 lg:mt-35 2xl:mt-30  font-semibold! tracking-widest!"
        >
          A Quantum Leap in Sound Engineering.
        </h3>
        <p
          ref={fourthText}
          className="text-center max-w-[795px] text-[clamp(9px,5vw,16px)] mt-2 text-grey-100"
        >
          Traditional headphones struggle with distortion at high volumes.
          Beyerdynamic’s proprietary Tesla technology reengineers the acoustic
          transducer from the ground up. By utilizing a magnetic field that
          exceeds 1 Tesla—double the power of standard headphones—these drivers
          deliver flawless efficiency and lightning-fast precision.
        </p>
        <h3
          ref={fifthText}
          className="text-center font-mono text-grey-100  text-[clamp(20px,2vw,25px)] mt-20 md:mt-25 lg:mt-35 2xl:mt-30 font-semibold! tracking-widest!"
        >
          The Tesla Advantage:
        </h3>
        <p
          ref={sixthText}
          className="text-center max-w-[795px] text-[clamp(9px,5vw,16px)] mt-2 mb-5 text-grey-100"
        >
          <b>Zero Distortion:</b> The immense magnetic power drives the voice
          coil with absolute control, keeping your music perfectly clean and
          crisp at any volume. <br /> <br /> <b>Concert-Hall Soundstage:</b>{" "}
          Music doesn't just play in your ears; a multi-layered membrane
          projects a three-dimensional, spatial audio experience. <br /> <br />
          <b>Effortless Precision:</b>
          High efficiency unlocks deep, punchy bass and transparent highs,
          revealing hidden details in your favorite tracks.
        </p>
      </div>
    </div>
  );
};

export default TeslaModal;
