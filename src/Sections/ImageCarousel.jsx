import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const IMAGES = [
  { id: 0, src: "/Assets/waves.jpeg" },
  { id: 1, src: "/Assets/dance.jpeg" },
  { id: 2, src: "/Assets/double.jpeg" },
  { id: 3, src: "/Assets/young.jpeg" },
  { id: 4, src: "/Assets/stretch.jpeg" },
  { id: 5, src: "/Assets/play.jpeg" },
];

const DURATION = 7; // seconds
const ANIM_SECS = 0.55;

const CARD_W_PCT = 0.72;
const CARD_RATIO = 9 / 16;
const SIDE_SCALE = 0.62;
const SIDE_OFFSET = 0.42;

function wrap(i, len) {
  return ((i % len) + len) % len;
}

function buildSlots(containerW) {
  const sideX = containerW * SIDE_OFFSET;
  return {
    left: {
      x: -sideX,
      scale: SIDE_SCALE,
      opacity: 1,
      zIndex: 1,
      filter: "blur(10px)",
    },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 2, filter: "blur(0px)" },
    right: {
      x: sideX,
      scale: SIDE_SCALE,
      opacity: 1,
      zIndex: 1,
      filter: "blur(10px)",
    },
    hidden: {
      x: containerW,
      scale: SIDE_SCALE * 0.8,
      opacity: 0,
      zIndex: 0,
    },
    exit: { x: -containerW, scale: SIDE_SCALE * 0.8, opacity: 0, zIndex: 0 },
  };
}

function setSlot(el, slots, slotName, animate = false) {
  if (!el) return;
  const cfg = slots[slotName];
  if (animate) {
    gsap.to(el, { ...cfg, duration: ANIM_SECS, ease: "power3.inOut" });
  } else {
    gsap.set(el, cfg);
  }
}

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const trackRef = useRef(null);
  const cards = useRef([]);
  const barRef = useRef(null);

  const curRef = useRef(0);
  const slotsRef = useRef(buildSlots(360));
  const [trackHeight, setTrackHeight] = useState(300);

  // Master GSAP timeline to control progress bar autoforwarding
  const timelineRef = useRef(null);

  useEffect(() => {
    curRef.current = current;
  }, [current]);

  function getCardSize(w) {
    const cardW = w * CARD_W_PCT;
    const cardH = cardW * CARD_RATIO;
    return { cardW, cardH };
  }

  function sizeCards(w) {
    const { cardW, cardH } = getCardSize(w);
    cards.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;
      el.style.borderRadius = `${Math.max(10, cardW * 0.04)}px`;
    });
  }

  function layoutAll(idx, slots) {
    const len = IMAGES.length;
    cards.current.forEach((el, i) => {
      if (i === wrap(idx - 1, len)) setSlot(el, slots, "left");
      else if (i === idx) setSlot(el, slots, "center");
      else if (i === wrap(idx + 1, len)) setSlot(el, slots, "right");
      else gsap.set(el, slots.hidden);
    });
  }

  // Pure advance function triggered directly by the timeline completion
  function advance() {
    const slots = slotsRef.current;
    const len = IMAGES.length;
    const cur = curRef.current;
    const next = wrap(cur + 1, len);
    const nextNext = wrap(cur + 2, len);
    const prev = wrap(cur - 1, len);

    gsap.set(cards.current[nextNext], slots.hidden);

    setSlot(cards.current[prev], slots, "exit", true);
    setSlot(cards.current[cur], slots, "left", true);
    setSlot(cards.current[next], slots, "center", true);
    setSlot(cards.current[nextNext], slots, "right", true);

    // Sync state layout safely
    setCurrent(next);
  }

  // Handle Resize and Initial Layout
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const slots = buildSlots(w);
      slotsRef.current = slots;

      sizeCards(w);
      layoutAll(curRef.current, slots);
      setTrackHeight(getCardSize(w).cardH + 80);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Initialize and manage the progress bar timeline
  useEffect(() => {
    // Create a timeline that autoadvances and fills up the bar
    timelineRef.current = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        advance();
      },
    });

    // Animate width from 0 to 100% smoothly over DURATION seconds
    timelineRef.current.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "100%", duration: DURATION, ease: "none" },
    );

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  // Handle Pause / Play state cleanly
  useEffect(() => {
    if (!timelineRef.current) return;
    if (paused) {
      timelineRef.current.pause();
    } else {
      timelineRef.current.play();
    }
  }, [paused]);

  function togglePause() {
    setPaused((p) => !p);
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full  min-h-screen bg-[#0e0c0a] overflow-hidden select-none">
      <div
        ref={trackRef}
        className="relative w-full max-w-[1700px] flex items-center justify-center"
        style={{ height: trackHeight }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={img.id}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="absolute overflow-hidden"
            style={{
              background: img.bg,
              willChange: "transform, opacity",
              transformOrigin: "center center",
              width: "72%",
              aspectRatio: "16/9",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
            }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Progress bar + pause/play */}
      <div className="flex items-center gap-3 mt-8">
        <div
          className="relative h-[5px] rounded-full bg-white/10 overflow-hidden"
          style={{ width: "clamp(140px, 40vw, 220px)" }}
        >
          <div
            ref={barRef}
            className="absolute left-0 top-0 h-full rounded-full bg-white/80"
            style={{ width: "0%" }}
          />
        </div>

        <button
          onClick={togglePause}
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center cursor-pointer flex-shrink-0"
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 2l9 5-9 5V2z" fill="white" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="3.5" height="10" rx="1" fill="white" />
              <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="white" />
            </svg>
          )}
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-4">
        {IMAGES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-[4px] bg-white"
                : "w-[4px] h-[4px] bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
