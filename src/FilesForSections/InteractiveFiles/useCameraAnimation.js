import { gsap } from "gsap";

const CAMERA_STATES = {
  null: { position: [0, 0, 1], target: [0, 0, 0] },
  view: { position: [0, 0, 1], target: [0, 0, 0] }, // same as null
  tesla: { position: [0, 0, 1], target: [0, 0, 0] },
  touch: { position: [0, 0, 1], target: [0, 0, 0] },
  comfort: { position: [0, 0, 1], target: [0, 0, 0] },
  sound: { position: [0, 0, 1], target: [0, 0, 0] },
};

function useCameraAnimation(cameraControlsRef) {
  const animate = (activeId) => {
    if (!cameraControlsRef.current) return;
    const state = CAMERA_STATES[activeId] ?? CAMERA_STATES[null];
    const controls = cameraControlsRef.current;
    const cam = cameraControlsRef.current.object;

    cam.position.set(...state.position);
    controls.target.set(...state.target);
    controls.update();

    gsap.to(cam.position, {
      x: state.position[0],
      y: state.position[1],
      z: state.position[2],
      duration: 1.5,
      ease: "power2.inOut",
    });
    gsap.to(cameraControlsRef.current.target, {
      x: state.target[0],
      y: state.target[1],
      z: state.target[2],
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => cameraControlsRef.current?.update(), // 👈 optional chaining
    });
  };

  return { animate };
}

export default useCameraAnimation;
