import { useState, useEffect, useRef, lazy, Suspense } from "react";
import InteractiveButtons from "../FilesForSections/InteractiveFiles/InteractiveButtons.jsx";
import features from "../FilesForSections/InteractiveFiles/ButtonsCopy.js";

const Interactive3DView = lazy(
  () => import("../FilesForSections/InteractiveFiles/Interactive3DView.jsx"),
);

const Interactive = () => {
  const [activeId, setActiveId] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div
      ref={sectionRef}
      className="bg-[#0e0c0a] w-full lg:max-w-300 3xl:max-w-425 justify-center mx-auto flex flex-col lg:flex-row lg:h-[85vh]"
    >
      {/* Left — accordion buttons */}
      <div className="hidden lg:flex flex-col justify-center w-[380px] shrink-0 p-8 border-r border-white/[0.08]">
        <InteractiveButtons activeId={activeId} onSelect={handleSelect} />
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-2">
        <div className="w-full max-w-[min(80vw,75vh)] aspect-square">
          {shouldLoad ? (
            <Suspense
              fallback={
                <div className="w-full h-full bg-[#0e0c0a] flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-white/20 border-t-white/60 animate-spin" />
                  <p className="text-white/40 text-sm font-mono tracking-wider text-center">
                    3D model is loading, please wait a few seconds
                  </p>
                </div>
              }
            >
              <Interactive3DView activeId={activeId} />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-[#0e0c0a]" />
          )}
        </div>
      </div>

      {/* Mobile bottom section — unchanged */}
      <div className="lg:hidden flex flex-col border-t border-white/[0.08]">
        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 pt-4 pb-3 w-full">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelect(f.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm border transition-all duration-200 whitespace-nowrap ${
                activeId === f.id
                  ? "border-white/50 bg-white/10 text-white"
                  : "border-white/15 bg-white/[0.04] text-white/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${activeId ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {features.map(
            (f) =>
              f.id === activeId && (
                <p
                  key={f.id}
                  className="px-5 pb-5 pt-1 text-sm text-white/50 leading-relaxed"
                >
                  {f.body}
                </p>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Interactive;
