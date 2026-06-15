import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../Components/Button.jsx";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      gsap.set([".buy-btn", ".price", ".view-link"], { opacity: 0, y: 20 });
    },
    { scope: containerRef },
  );

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || animatedRef.current) return;

    if (video.currentTime >= video.duration / 2) {
      animatedRef.current = true;
      gsap.to([".buy-btn", ".price", ".view-link"], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen md:min-h-screen lg:min-h-[calc(100vh-64px)] pb-15 lg:pb-0 lg:mt-16 flex flex-col items-center justify-center">
        <div className="max-w-310 3xl:max-w-none">
          <video
            ref={videoRef}
            fetchPriority="high"
            preload="auto"
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          >
            <source src="/Assets/HeroVideo4.webm" type="video/webm" />
          </video>
        </div>
        <div
          ref={containerRef}
          className="mt-10 md:mt-20 lg:mt-10 flex flex-col items-center"
        >
          <div className="flex flex-center gap-3.75">
            <span className="buy-btn">
              <Button variant="outline">Buy</Button>
            </span>
            <em className="price text-grey-700">for 479€</em>
          </div>
          <div className="mt-5 cursor-pointer">
            <a className="view-link text-orange-400 font-mono hover:text-orange-300">
              View pricing options
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
