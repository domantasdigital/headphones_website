import { gsap } from "gsap";

function useModelAnimation(headphonesModelRef) {
  const killAll = () => {
    // Kill the comfort timeline
    if (headphonesModelRef.current?._comfortTimeline) {
      headphonesModelRef.current._comfortTimeline.kill();
      headphonesModelRef.current._comfortTimeline = null;
    }
    // Kill any other tweens acting on the rotation object
    gsap.killTweensOf(headphonesModelRef.current?.rotation);
  };

  const resetRotation = () => {
    // IMPORTANT: Return the promise
    return new Promise((resolve) => {
      gsap.to(headphonesModelRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  };

  const animations = {
    null: () => {
      killAll();
      resetRotation();
    },
    view: () => {
      killAll();
      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (headphonesModelRef.current)
            headphonesModelRef.current.rotation.y = 0;
        },
      });
    },
    tesla: () => {
      killAll();
      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 0.2,
        x: -Math.PI * 0.1,
        duration: 1, // Shortened for snappier response
        ease: "power2.inOut",
      });
    },
    touch: () => {
      killAll();
      gsap.to(headphonesModelRef.current.rotation, {
        y: -Math.PI * 0.5,
        x: -Math.PI * 0.2,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    comfort: () => {
      killAll();
      if (!headphonesModelRef.current) return;

      const tl = gsap.timeline();
      tl.to(headphonesModelRef.current.rotation, {
        x: Math.PI * 0.35,
        y: 0,
        duration: 2,
        ease: "power2.inOut",
      })
        .to(headphonesModelRef.current.rotation, {
          x: Math.PI * 0.3,
          y: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(headphonesModelRef.current.rotation, {
          x: -Math.PI * 0.25,
          y: 0,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(headphonesModelRef.current.rotation, {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.inOut",
        });

      headphonesModelRef.current._comfortTimeline = tl;
    },
    sound: () => {
      killAll();
      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 0.25,
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    },
  };

  const animate = (activeId) => {
    // Directly invoke the matching function
    const fn = animations[activeId] ?? animations[null];
    fn();
  };

  return { animate };
}

export default useModelAnimation;
