import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(useGSAP, ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: "Which devices are compatible with the Amiron wireless?",
    answer:
      "Connect the Amiron wireless to any smartphone or tablet that supports Bluetooth 2.1 or later. For laptops and desktop computers, your device needs to support the A2DP and AVRCP Bluetooth profiles for audio playback, plus HFP if you want to use the built-in microphone for calls.",
  },
  {
    id: 2,
    question: "How many devices can be connected simultaneously?",
    answer:
      "The Amiron wireless pairs with up to 8 devices over Bluetooth. You can maintain active connections with two devices at once — though music should play on one device at a time to ensure uninterrupted transmission. Phone calls always take priority: an incoming call will automatically pause your music.",
  },
  {
    id: 3,
    question: "What codecs does the Amiron wireless support?",
    answer:
      "The Amiron wireless supports Qualcomm® aptX™ HD and Apple AAC for high-resolution wireless audio, plus aptX™ LL for low-latency transmission — ideal for video. It also supports the standard aptX™ and SBC codecs for universal Bluetooth compatibility.",
  },
  {
    id: 4,
    question: "How does the MIY App and MOSAYC sound personalisation work?",
    answer:
      "Download the MIY app (available on iOS and Android) and take a two-minute hearing test. The app uses MOSAYC — Attention to Detail with Mimi Sound Personalization — to profile your individual hearing and apply a custom EQ curve tailored specifically to you. No two people hear alike; your Amiron wireless adapts to match.",
  },
  {
    id: 5,
    question: "What is the battery life, and how is it charged?",
    answer:
      "The Amiron wireless delivers over 30 hours of continuous playback on a single charge. When the battery runs low, the headphones can also be used in wired mode via the included cable — so your listening never has to stop.",
  },
  {
    id: 6,
    question:
      "What is the difference between the Amiron wireless and Amiron wireless copper?",
    answer:
      "Sonically and technically, they are identical. The copper edition is a design variant finished in a warm copper colour — a nod to the material's centuries-long association with innovation and craftsmanship. Both versions fully support the MIY App and MOSAYC sound personalisation.",
  },
  {
    id: 7,
    question: "Are spare parts and accessories available?",
    answer:
      "Yes. Replacement ear pads and cables are available directly from beyerdynamic. Compatible accessories include a Luxury Hard Case, a headphone table stand, a connecting cord with 3-button controller, and a USB Wireless Adapter for Bluetooth connectivity on computers.",
  },
  {
    id: 8,
    question: "Where is the Amiron wireless made?",
    answer:
      "The Amiron wireless is made in Germany, assembled by experienced hands at beyerdynamic's headquarters in Heilbronn. The craftsmanship is built to last — a quality you will feel at first touch and continue to appreciate year after year.",
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const lineRef = useRef(null);
  const arrowRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(bodyRef.current, { height: 0, opacity: 0 });
    },
    { scope: bodyRef },
  );

  const toggle = () => {
    const el = bodyRef.current;

    if (!open) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(arrowRef.current, {
        rotate: 45,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.05,
      });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power3.in" });
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power3.in" });
    }
    setOpen(!open);
  };

  return (
    <div className="border-t border-stone-800 last:border-b">
      <button
        onClick={toggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span className="text-xs text-orange-300 font-mono mt-1 shrink-0 tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base md:text-lg font-medium text-grey-700 leading-snug group-hover:text-orange-400 transition-colors duration-200 ">
            {faq.question}
          </span>
        </div>
        <span
          ref={arrowRef}
          className="shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-orange-500"
          style={{ transformOrigin: "center" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line
              x1="7"
              y1="0"
              x2="7"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="0"
              y1="7"
              x2="14"
              y2="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>

      <div ref={bodyRef} className="overflow-hidden">
        <div className="pb-6 pl-10 pr-1">
          {/* animated accent line */}
          <div className="mb-4 h-px bg-grey-500/20 relative overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-y-0 left-0 w-full bg-orange-500"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>
          <p className="text-grey-800 leading-relaxed text-sm md:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(headerRef.current.children, {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(listRef.current.children, {
        y: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.35,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div style={{ backgroundColor: "#faf8f7" }}>
      <section ref={sectionRef} className="min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto flex flex-col flex-center">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <p className="text-orange-500 text-xs tracking-[0.3em] font-mono uppercase mb-4 text-center">
              Amiron Wireless · FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold  leading-tight tracking-tight text-center text-grey-900">
              Any questions left?
            </h2>
            <p className="mt-4 text-grey-500 text-base max-w-lg leading-relaxed text-center">
              Everything you need to know about beyerdynamic's high-end Tesla
              Bluetooth headphones with sound personalisation.
            </p>
          </div>

          {/* FAQ List */}
          <div ref={listRef}>
            {faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} index={i} />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-stone-500 text-sm">
              Still have a question? beyerdynamic's support team is here.
            </p>
            <a
              href="https://europe.beyerdynamic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition-colors duration-200 group"
            >
              Visit beyerdynamic.com
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path
                  d="M2 12L12 2M12 2H6M12 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
