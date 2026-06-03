import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Button from "../Components/Button.jsx";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [".buy-btn", ".price", ".view-link"],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.5,
          delay: 2.3,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <>
      <div className="min-h-[30vh] md:min-h-[70vh] xl:min-h-[calc(100vh-64px)] mt-16  flex flex-col items-center">
        <div className="max-w-310 3xl:max-w-none">
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Assets/Hero_Video_3.webm" type="video/webm" />
          </video>
        </div>
        <div ref={containerRef} className="  mt-10 flex flex-col items-center">
          <div className="flex flex-center gap-3.75">
            <span className="buy-btn ">
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
