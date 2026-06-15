import { useEffect, useRef } from "react";

const usePreloader = (imageSrcs = []) => {
  const called = useRef(false); // StrictMode guard

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    if (!imageSrcs.length) {
      setTimeout(() => window.__finishPreloader?.(), 500);
      return;
    }

    let loaded = 0;
    const total = imageSrcs.length;

    imageSrcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) window.__finishPreloader?.();
      };
      img.src = src;
    });
  }, []);
};

export default usePreloader;
