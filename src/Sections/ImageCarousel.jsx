import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const IMAGES = [
  { id: 0, bg: "#3ABFF8", label: "01" },
  { id: 1, bg: "#36D399", label: "02" },
  { id: 2, bg: "#F87272", label: "03" },
  { id: 3, bg: "#FBBD23", label: "04" },
  { id: 4, bg: "#A78BFA", label: "05" },
];

const DURATION = 2000; // ms per slide
const ANIM_SECS = 0.55; // GSAP transition duration

// Card sizing — percentages of container width
const CARD_W_PCT = 0.72; // center card width  (72% of container)
const CARD_RATIO = 9 / 16; // height / width ratio
const SIDE_SCALE = 0.62; // side cards scale relative to center
const SIDE_OFFSET = 0.62; // how far side cards shift (fraction of container)

function wrap(i, len) {
  return ((i % len) + len) % len;
}

// Build slot configs from live container width
function buildSlots(containerW) {
  const sideX = containerW * SIDE_OFFSET;
  return {
    left: { x: -sideX, scale: SIDE_SCALE, opacity: 1, zIndex: 1 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 2 },
    right: { x: sideX, scale: SIDE_SCALE, opacity: 1, zIndex: 1 },
    hidden: { x: containerW, scale: SIDE_SCALE * 0.8, opacity: 0, zIndex: 0 },
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

  // DOM refs
  const trackRef = useRef(null); // the card track container
  const cards = useRef([]);
  const barRef = useRef(null);

  // Mutable state refs (safe to read inside rAF without stale closures)
  const curRef = useRef(0);
  const pausedRef = useRef(false);
  const animating = useRef(false);
  const elapsed = useRef(0);
  const lastTs = useRef(null);
  const rafId = useRef(null);
  const slotsRef = useRef(buildSlots(360)); // fallback until measured
  const containerW = useRef(360);
  const isInitialized = useRef(false);

  useEffect(() => {
    curRef.current = current;
  }, [current]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // ── Compute card size from container width ────────────────────────────────
  function getCardSize(w) {
    const cardW = w * CARD_W_PCT;
    const cardH = cardW * CARD_RATIO;
    return { cardW, cardH };
  }

  // ── Apply pixel size to every card DOM node ───────────────────────────────
  function sizeCards(w) {
    const { cardW, cardH } = getCardSize(w);
    cards.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;
      el.style.borderRadius = `${Math.max(10, cardW * 0.04)}px`;
    });
  }

  // ── Position all cards for a given index ─────────────────────────────────
  function layoutAll(idx, slots) {
    const len = IMAGES.length;
    cards.current.forEach((el, i) => {
      if (i === wrap(idx - 1, len)) setSlot(el, slots, "left");
      else if (i === idx) setSlot(el, slots, "center");
      else if (i === wrap(idx + 1, len)) setSlot(el, slots, "right");
      else gsap.set(el, slots.hidden);
    });
  }

  // ── Advance one step ──────────────────────────────────────────────────────
  function advance() {
    if (animating.current) return;
    animating.current = true;

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

    setTimeout(
      () => {
        setCurrent(next);
        animating.current = false;
      },
      ANIM_SECS * 1000 + 30,
    );
  }

  // ── ResizeObserver — recompute everything when container resizes ──────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      containerW.current = w;
      const slots = buildSlots(w);
      slotsRef.current = slots;
      sizeCards(w);
      layoutAll(curRef.current, slots);
    });

    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── rAF ticker ────────────────────────────────────────────────────────────
  useEffect(() => {
    function tick(ts) {
      if (!pausedRef.current && !animating.current) {
        if (lastTs.current == null) lastTs.current = ts;
        elapsed.current += ts - lastTs.current;
      }
      lastTs.current = ts;

      const pct = Math.min(elapsed.current / DURATION, 1);
      if (barRef.current) barRef.current.style.width = `${pct * 100}%`;

      if (pct >= 1) {
        elapsed.current = 0;
        lastTs.current = null;
        advance();
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePause() {
    setPaused((p) => {
      if (p) lastTs.current = null;
      return !p;
    });
  }

  // Track height = center card height + vertical breathing room
  const trackH = getCardSize(containerW.current).cardH + 80;

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0e0e0e] overflow-hidden select-none">
      {/* Card track — full width, cards are absolutely centred inside */}
      <div
        ref={trackRef}
        className="relative w-full flex items-center justify-center"
        style={{ height: trackH }}
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
              // initial size — ResizeObserver will correct immediately
              width: "72%",
              aspectRatio: "16/9",
            }}
          >
            {/* Replace inner div with <img src={img.src} className="w-full h-full object-cover" /> */}
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-white/20 font-black leading-none"
                style={{ fontSize: "clamp(40px, 15vw, 120px)" }}
              >
                {img.label}
              </span>
            </div>
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
            style={{ width: "0%", transition: "none" }}
          />
        </div>

        <button
          onClick={togglePause}
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
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
