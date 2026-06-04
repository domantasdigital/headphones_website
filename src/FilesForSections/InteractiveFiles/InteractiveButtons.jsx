import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import features from "./ButtonsCopy.js";

// --- Plus icon with circle ---
const PlusIcon = ({ isOpen }) => (
  <div
    className={`
      w-6 h-6 rounded-full border flex-shrink-0
      flex items-center justify-center relative
      transition-colors duration-300
      ${isOpen ? "border-white/70 bg-white/10" : "border-white/35"}
    `}
  >
    {/* horizontal bar — always visible */}
    <span className="absolute w-[9px] h-[1.5px] bg-white/80 rounded-sm" />
    {/* vertical bar — collapses when open */}
    <span
      className={`
        absolute w-[1.5px] h-[9px] bg-white/80 rounded-sm
        transition-transform duration-300 origin-center
        ${isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}
      `}
    />
  </div>
);

// --- Single accordion item ---
const AccordionItem = ({ feature, isOpen, onToggle }) => {
  const bodyRef = useRef(null);
  const innerRef = useRef(null);
  const tweenRef = useRef(null);

  // This runs whenever isOpen changes from outside (another button was clicked)
  useEffect(() => {
    if (!bodyRef.current) return;
    tweenRef.current?.kill();

    if (isOpen) {
      bodyRef.current.style.display = "block";
      const fullHeight = innerRef.current.scrollHeight;
      tweenRef.current = gsap.fromTo(
        bodyRef.current,
        { maxHeight: 0, opacity: 0 },
        {
          maxHeight: fullHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
      );
    } else {
      tweenRef.current = gsap.to(bodyRef.current, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (bodyRef.current) bodyRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]); // fires every time isOpen flips

  // handleClick now just tells the parent — no GSAP here anymore
  const handleClick = () => {
    onToggle(feature.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-[10px] border cursor-pointer select-none
        transition-colors duration-200
        ${isOpen ? "border-white/30" : "border-white/10 hover:border-white/20"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <PlusIcon isOpen={isOpen} />
        <span
          className={`text-sm tracking-wide transition-colors duration-200 ${isOpen ? "text-white" : "text-white/70"}`}
        >
          {feature.label}
        </span>
      </div>

      <div
        ref={bodyRef}
        style={{
          maxHeight: 0,
          overflow: "hidden",
          opacity: 0,
          display: "none",
        }}
      >
        <div ref={innerRef} className="px-4 pb-4 pl-[52px]">
          <p className="text-sm text-white/50 leading-relaxed">
            {feature.body}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main component ---
const InteractiveButtons = ({ activeId, onSelect }) => {
  const handleToggle = (id) => {
    const nextId = activeId === id ? null : id;
    onSelect?.(nextId);
  };

  return (
    <div className="flex flex-col gap-2 max-w-full">
      {features.map((f) => (
        <AccordionItem
          key={f.id}
          feature={f}
          isOpen={activeId === f.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
export default InteractiveButtons;
