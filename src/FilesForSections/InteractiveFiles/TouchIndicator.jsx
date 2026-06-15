import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TouchIndicator({ visible }) {
  const matRef = useRef();
  const opacityRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const textureRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    canvasRef.current = canvas;
    ctxRef.current = canvas.getContext("2d");
    textureRef.current = new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    // clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);

    if (visible) {
      // wait 2 seconds then fade in
      timerRef.current = setTimeout(() => {
        targetOpacityRef.current = 1;

        // after 2.5 seconds of being visible, fade out
        timerRef.current = setTimeout(() => {
          targetOpacityRef.current = 0;
        }, 2500);
      }, 2000);
    } else {
      targetOpacityRef.current = 0;
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  useFrame(({ clock }, delta) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const texture = textureRef.current;
    if (!ctx || !canvas || !texture || !matRef.current) return;

    // smoothly interpolate toward target — this is the fade
    opacityRef.current +=
      (targetOpacityRef.current - opacityRef.current) * delta * 3;

    const t = clock.getElapsedTime();
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    if (opacityRef.current > 0.01) {
      for (let i = 0; i < 3; i++) {
        const phase = (t * 1.5 + i * 0.33) % 1;
        const radius = phase * cx * 0.9;
        const alpha = (1 - phase) * opacityRef.current;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }

    texture.needsUpdate = true;
    if (matRef.current.map !== texture) {
      matRef.current.map = texture;
    }
  });

  return (
    <mesh position={[-0.005, -0.0295, 0.16]}>
      <planeGeometry args={[0.1, 0.1]} />
      <meshBasicMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
