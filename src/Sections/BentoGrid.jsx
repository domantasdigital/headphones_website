import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { flushSync } from "react-dom";
import "../CSS for specific sections/BentoGridCss.css";
import "../CSS for specific sections/BentoPhone.css";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import card1 from "/Assets/Card_1.webp";
import card2 from "/Assets/Card_2.webp";
import card3 from "/Assets/Card_3.webp";
import card4 from "/Assets/Card_4.webp";
import card5 from "/Assets/Card_5.webp";

import bContent from "../Components/BentoGrid_Section_Content.js";

gsap.registerPlugin(Flip);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const [expanded, setExpanded] = useState(null);
  const containerRef = useRef(null);

  const box1DescriptionRef = useRef(null);
  const box2DescriptionRef = useRef(null);
  const box3DescriptionRef = useRef(null);
  const box4DescriptionRef = useRef(null);
  const box4ULRef = useRef(null);
  const box5DescriptionRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (expanded) return; // don't hover-animate when something is expanded
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: "0 0 0 2px #ED5A11",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    if (expanded) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0 0px #ED5A11",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleExpand = (id) => {
    const box = containerRef.current.querySelector(`.${id}`);

    // gsap.to(box, {
    //   scale: 1.02,
    //   boxShadow: "0 0 0 3px #ED5A11",
    //   duration: 0.3,
    // });
    gsap.killTweensOf(box);
    gsap.set(box, { scale: 1, boxShadow: "0 0 0 0px #ED5A11" });

    const state = Flip.getState(
      containerRef.current.querySelectorAll(".boxes"),
    );
    flushSync(() => setExpanded(id));

    Flip.from(state, {
      duration: 1,
      absolute: true,
      ease: "power2.inOut",

      boxShadow: "0 0 0 0px #FAF8F7",

      onLeave: (elements) =>
        gsap.to(elements, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          stagger: 0.05,
        }),
    });

    // ANIMATING DESCRIPTIONS-------------------------------

    const split1 = new SplitText(box1DescriptionRef.current, {
      type: "lines",
    });
    gsap.fromTo(
      split1.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
    );

    const split2 = new SplitText(box2DescriptionRef.current, {
      type: "lines",
    });
    gsap.fromTo(
      split2.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
    );

    const split3 = new SplitText(box3DescriptionRef.current, {
      type: "lines",
    });
    gsap.fromTo(
      split3.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
    );

    const split4 = new SplitText(box4DescriptionRef.current, {
      type: "lines",
    });
    gsap.fromTo(
      split4.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
    );
    const split4ULItems = box4ULRef.current.querySelectorAll("li");
    gsap.fromTo(
      split4ULItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1.8,
        stagger: 0.15,
        ease: "power2.out",
      },
    );

    const split5 = new SplitText(box5DescriptionRef.current, {
      type: "lines",
    });
    gsap.fromTo(
      split5.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
    );
  };

  const handleClose = (e) => {
    e.stopPropagation();

    const state = Flip.getState(
      containerRef.current.querySelectorAll(".boxes"),
    );

    flushSync(() => setExpanded(null));

    Flip.from(state, {
      duration: 0.8,
      ease: "power2.inOut",

      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0 },
          { opacity: 1, delay: 0.8, duration: 1.2, stagger: 0.1 },
        ),
    });

    // Handling phone version
  };
  const [phoneGridOpen, setPhoneGridOpen] = useState(false);

  const toggle = (e, id) => {
    const el = e.currentTarget.querySelector("[data-content]");

    // close previously open card if different one is clicked
    if (phoneGridOpen && phoneGridOpen !== id) {
      const prevEl = document.querySelector(
        `[data-id="${phoneGridOpen}"] [data-content]`,
      );
      if (prevEl)
        gsap.to(prevEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
    }

    if (phoneGridOpen !== id) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" },
      );
      setPhoneGridOpen(id);
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      setPhoneGridOpen(null);
    }
  };

  // Heading animation
  const headingRef = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      );
    });
  }, []);

  const boxClass = (id) =>
    `boxes ${id} ${expanded === id ? "expanded" : ""} ${expanded && expanded !== id ? "collapsed" : ""}`;

  return (
    <div className="md:h-screen mt-15 md:mt-15 max-w-7xl w-full mx-auto px-2 ">
      <h4
        ref={headingRef}
        className="text-xl text-grey-900 md:text-4xl text-center mb-8 md:mb-15"
      >
        Tired of just <i>good enough?</i>
      </h4>
      {/* The vertical grid layout for phones */}

      <div
        onClick={(e) => toggle(e, "card1")}
        data-id="card1"
        className="rounded-2xl bg-[#f5f0eb] overflow-hidden mb-4 cursor-pointer pBox-1 block md:hidden "
      >
        {/* image + label row — always visible */}
        <div className="flex flex-center justify-between  px-7 py-4 h-[15vh] ">
          <img src={card1} className="w-24 h-24 object-contain pBox-1-img" />
          <h6 className="body-comment">Listen freely.</h6>
        </div>

        {/* expandable content */}
        <div data-content style={{ height: 0, overflow: "hidden" }}>
          <p className="px-6 pb-6 text-sm text-gray-600">
            {bContent.card1.description}
          </p>
          <p className="px-6 pb-6 text-sm text-gray-600">
            <i>{bContent.card1.break}</i>
          </p>
        </div>
      </div>

      <div
        onClick={(e) => toggle(e, "card2")}
        data-id="card2"
        className="rounded-2xl mb-4 bg-[#f5f0eb] overflow-hidden cursor-pointer pBox-2 block md:hidden "
      >
        {/* image + label row — always visible */}
        <div className="flex flex-center justify-between  px-7 py-4 h-[15vh] ">
          <h6 className="body-comment">Listen freely.</h6>
          <img src={card2} className="w-24 h-24 object-contain pBox-2-img" />
        </div>

        {/* expandable content */}
        <div data-content style={{ height: 0, overflow: "hidden" }}>
          <p className="px-6 pb-6 text-sm text-gray-600">
            {bContent.card2.description}
          </p>
        </div>
      </div>
      <div
        onClick={(e) => toggle(e, "card3")}
        data-id="card3"
        className="rounded-2xl mb-4 bg-[#f5f0eb] overflow-hidden cursor-pointer pBox-3 block md:hidden "
      >
        {/* image + label row — always visible */}
        <div className="flex flex-center justify-between  px-7 py-4 h-[15vh] ">
          <img src={card3} className="w-24 h-24 object-contain pBox-3-img" />
          <h6 className="body-comment">Craftsmanship.</h6>
        </div>

        {/* expandable content */}
        <div data-content style={{ height: 0, overflow: "hidden" }}>
          <p className="px-6 pb-6 text-sm text-gray-600">
            {bContent.card3.description}
          </p>
          <p className="px-6 pb-6 text-sm text-gray-600">
            <i>{bContent.card3.break}</i>
          </p>
        </div>
      </div>
      <div
        onClick={(e) => toggle(e, "card4")}
        data-id="card4"
        className="rounded-2xl mb-4 bg-[#f5f0eb] overflow-hidden cursor-pointer pBox-4 block md:hidden "
      >
        {/* image + label row — always visible */}
        <div className="flex flex-center justify-between  px-7 py-4 h-[15vh] ">
          <h6 className="body-comment">Control & interact.</h6>
          <img src={card4} className="w-24 h-24 object-contain pBox-4-img" />
        </div>

        {/* expandable content */}
        <div data-content style={{ height: 0, overflow: "hidden" }}>
          <p className="px-6 pb-6 text-sm text-gray-600">
            {bContent.card4.description}
          </p>
          <ul className="px-6 pb-6 text-sm text-gray-600">
            <i>
              <li>{bContent.card4.ul.liFirst}</li>
              <li>{bContent.card4.ul.liSecond}</li>
              <li>{bContent.card4.ul.liThird}</li>
            </i>
          </ul>
        </div>
      </div>
      <div
        onClick={(e) => toggle(e, "card5")}
        data-id="card5"
        className="rounded-2xl mb-4 bg-[#f5f0eb] overflow-hidden cursor-pointer pBox-5 block md:hidden "
      >
        {/* image + label row — always visible */}
        <div className="flex flex-center justify-between  px-7 py-4 h-[15vh] ">
          <img src={card5} className="w-24 h-24 object-contain pBox-5-img" />
          <h6 className="body-comment">Comfort.</h6>
        </div>

        {/* expandable content */}
        <div data-content style={{ height: 0, overflow: "hidden" }}>
          <p className="mt-9 px-6 pb-6 text-sm text-gray-600">
            {bContent.card5.description}
          </p>
          <p className="px-6 pb-6 text-sm text-gray-600">
            <i>{bContent.card5.break}</i>
          </p>
        </div>
      </div>

      {/* The Bento grid layout for tablets and desktop 
      
      
      
      
      
      
      
      
      
      
      
      */}
      <div
        className={`grid-container ${expanded ? "has-expanded" : ""} mx-auto display-none md:flex`}
        ref={containerRef}
      >
        <div
          className={`${boxClass("box-1")}`}
          style={{ gridArea: "box-1" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-1")}
        >
          <img src={card1} alt="" className="card-image" />
          <h6 className="card-label">Listen freely.</h6>
          <p className="description" ref={box1DescriptionRef}>
            {bContent.card1.description}
            <br />
            <br />
            <i>{bContent.card1.break}</i>
          </p>

          {expanded === "box-1" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
        <div
          className={`${boxClass("box-2")} bg-amber-300`}
          style={{ gridArea: "box-2" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-2")}
        >
          <img src={card2} alt="" className="card-image" />
          <h6 className="card-label">Personalize for you.</h6>
          <p className="description" ref={box2DescriptionRef}>
            {bContent.card2.description}
          </p>
          {expanded === "box-2" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
        <div
          className={`${boxClass("box-3")} bg-red-500`}
          style={{ gridArea: "box-3" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-3")}
        >
          <img src={card3} alt="" className="card-image" />
          <h6 className="card-label">Craftsmanship.</h6>
          <p className="description" ref={box3DescriptionRef}>
            {bContent.card3.description}
            <br />
            <br />
            <i>{bContent.card3.break}</i>
          </p>
          {expanded === "box-3" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
        <div
          className={`${boxClass("box-4")} bg-blue-300`}
          style={{ gridArea: "box-4" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-4")}
        >
          <img src={card4} alt="" className="card-image" />
          <h6 className="card-label">Control & interact.</h6>
          <p className="description" ref={box4DescriptionRef}>
            {bContent.card4.description}
            <br />
            <br />
          </p>
          <ul className="unorderedList" ref={box4ULRef}>
            <i>
              <li>{bContent.card4.ul.liFirst}</li>
              <li>{bContent.card4.ul.liSecond}</li>
              <li>{bContent.card4.ul.liThird}</li>
            </i>
          </ul>

          {expanded === "box-4" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
        <div
          className={`${boxClass("box-5")} bg-orange-300`}
          style={{ gridArea: "box-5" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-5")}
        >
          <img src={card5} alt="" className="card-image" />
          <h6 className="card-label">Comfort.</h6>
          <p className="description" ref={box5DescriptionRef}>
            {bContent.card5.description}
            <br />
            <br />
            <i>{bContent.card5.break}</i>
          </p>
          {expanded === "box-5" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
