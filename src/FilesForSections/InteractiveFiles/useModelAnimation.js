import { gsap } from "gsap";

function useModelAnimation(headphonesModelRef) {
  // returns a promise that resolves when reset is done
  const resetRotation = () =>
    new Promise((resolve) => {
      gsap.to(headphonesModelRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });

  const killComfort = () => {
    if (headphonesModelRef.current?._comfortTimeline) {
      headphonesModelRef.current._comfortTimeline.kill();
      headphonesModelRef.current._comfortTimeline = null;
    }
  };

  const animations = {
    null: () => {
      killComfort();
      resetRotation();
    },

    view: () => {
      if (headphonesModelRef.current?._comfortTimeline)
        headphonesModelRef.current._comfortTimeline.kill();
      // full spin then stop
      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (headphonesModelRef.current) {
            headphonesModelRef.current.rotation.y = 0;
          }
        },
      });
    },

    tesla: () => {
      killComfort();
      resetRotation();

      // tilt to show driver face
      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 0.2,
        x: -Math.PI * 0.1,
        duration: 2,
        ease: "power2.inOut",
      });
    },

    touch: () => {
      killComfort();
      resetRotation();
      // rotate to show right earcup
      gsap.to(headphonesModelRef.current.rotation, {
        y: -Math.PI * 0.5,
        x: -Math.PI * 0.2,
        duration: 2,
        ease: "power2.inOut",
      });
    },

    comfort: () => {
      resetRotation();

      if (!headphonesModelRef.current) return;

      const tl = gsap.timeline();

      tl.to(headphonesModelRef.current.rotation, {
        x: Math.PI * 0.35,
        y: 0,
        duration: 3,
        ease: "power2.inOut",
      })
        .to(headphonesModelRef.current.rotation, {
          x: Math.PI * 0.3,
          y: 0.3,
          duration: 2,
          ease: "power1.inOut",
        })
        .to(headphonesModelRef.current.rotation, {
          x: -Math.PI * 0.25,
          y: 0,
          duration: 3,
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
      killComfort();
      resetRotation();

      gsap.to(headphonesModelRef.current.rotation, {
        y: Math.PI * 0.25,
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    },
  };

  const animate = (activeId) => {
    const fn = animations[activeId] ?? animations[null];
    fn();
  };

  return { animate };
}

export default useModelAnimation;
