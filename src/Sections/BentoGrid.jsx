import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { flushSync } from "react-dom";
import "../CSS for specific sections/BentoGridCss.css";

gsap.registerPlugin(Flip);

const BentoGrid = () => {
  const [expanded, setExpanded] = useState(null);
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);

  const handleMouseEnter = (e) => {
    if (expanded) return; // don't hover-animate when something is expanded
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: "0 0 0 3px #ED5A11",
      duration: 0.3,
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
    // const box = containerRef.current.querySelector(`.${id}`);

    // gsap.to(box, {
    //   scale: 1,
    //   boxShadow: "0 0 0 3px #ED5A11",
    //   duration: 5,
    // });

    const state = Flip.getState(
      containerRef.current.querySelectorAll(".boxes"),
    );
    flushSync(() => setExpanded(id));

    Flip.from(state, {
      duration: 1,
      absolute: true,
      ease: "power2.inOut",
      //   scale: 1,
      boxShadow: "0 0 0 0px #FAF8F7",
      clearProps: "scale,boxShadow",

      onLeave: (elements) =>
        gsap.to(elements, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          stagger: 0.05,
        }),
    });
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
  };

  const boxClass = (id) =>
    `boxes ${id} ${expanded === id ? "expanded" : ""} ${expanded && expanded !== id ? "collapsed" : ""}`;

  return (
    <div className="h-screen mt-50 px-20 ">
      <div
        className={`grid-container ${expanded ? "has-expanded" : ""}`}
        ref={containerRef}
      >
        <div
          className={`${boxClass("box-1")} bg-green-400`}
          style={{ gridArea: "box-1" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-1")}
        >
          <h4>Box 1</h4>
          <p>This text should only be seen when Box 1 was clicked to expand</p>
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
          <h4>Box 2</h4>
          <p>This text should only be seen when Box 2 was clicked to expand</p>
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
          <h4>Box 3</h4>
          <p>This text should only be seen when Box 3 was clicked to expand</p>
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
          <h4>Box 4</h4>
          <p>This text should only be seen when Box 4 was clicked to expand</p>
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
          <h4>Box 5</h4>
          <p>This text should only be seen when Box 5 was clicked to expand</p>
          {expanded === "box-5" && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
        <div
          className={`${boxClass("box-6")} bg-purple-400`}
          style={{ gridArea: "box-6" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => !expanded && handleExpand("box-6")}
        >
          <h4>Box 6</h4>
          <p>This text should only be seen when Box 6 was clicked to expand</p>
          {expanded === "box-6" && (
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
