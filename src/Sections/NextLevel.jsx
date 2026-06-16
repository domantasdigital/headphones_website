import Button from "../Components/Button.jsx";
import { useRef, useEffect } from "react";

const NextLevel = () => {
  const videoRef = useRef(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      if (hasLoadedRef.current) return;

      const source = video.querySelector("source");

      if (source?.dataset.src) {
        source.src = source.dataset.src;
      }

      video.preload = "auto";
      hasLoadedRef.current = true;
      video.load();
    };

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadVideo();
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    const playbackObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadVideo();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    preloadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="  pt:10 flex flex-col items-center bg-grey-100">
        <h1 className="text-[30px] px-5 sm:text-[42px]   lg:text-[61px] font-extrabold text-center">
          READY TO GO <span className="text-orange-500">NEXT LEVEL?</span>
        </h1>
        <div className="mt-12 flex flex-center gap-3.75">
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
        <div className="w-[200%] md:w-[150%] lg:w-300 mt-10 overflow-hidden ">
          <video ref={videoRef} muted preload="none" playsInline>
            <source data-src="/Assets/RTMAC.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </>
  );
};

export default NextLevel;
