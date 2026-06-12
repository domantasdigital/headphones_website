import { useState, useEffect } from "react";

// Pass in an array of image src strings from your first 3 sections
const usePreloader = (imageSrcs = []) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = imageSrcs.length;
    const MIN_DURATION = 1800; // ms — minimum time to show the preloader
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setProgress(100);
      setTimeout(() => setDone(true), remaining + 300);
    };

    if (total === 0) {
      // No images — just run a timed progress bar
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 18 + 8;
        if (p >= 100) {
          clearInterval(interval);
          finish();
        } else {
          setProgress(Math.min(p, 95));
        }
      }, 120);
      return () => clearInterval(interval);
    }

    const tick = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 95)); // cap at 95 until all done
      if (loaded >= total) finish();
    };

    imageSrcs.forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick; // count errors too, don't hang
      img.src = src;
    });
  }, []);

  return { progress, done };
};

export default usePreloader;
