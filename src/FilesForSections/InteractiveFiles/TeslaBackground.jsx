import { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0,
  },
  // vertex shader — now displaces vertices to make plane physically wave
  /*glsl*/ `
    uniform float uTime;
    varying vec2 vUv;
    varying float vWaveHeight; // pass wave height to fragment shader

    void main() {
      vUv = uv;

      vec3 pos = position;

      // multiple overlapping sine waves for organic movement
      float wave1 = sin(pos.x * 4.0 + uTime * 1.5) * 0.04;
      float wave2 = sin(pos.y * 3.0 + uTime * 1.2) * 0.03;
      float wave3 = sin((pos.x + pos.y) * 5.0 + uTime * 2.0) * 0.02;

      // center ripple — waves radiating from center
      float dist = length(pos.xy);
      float ripple = sin(dist * 12.0 - uTime * 2.5) * 0.03;

      pos.z += wave1 + wave2 + wave3 + ripple;
      vWaveHeight = pos.z; // send to fragment for color influence

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;
    varying float vWaveHeight;

    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);

      float wave = sin(dist * 18.0 - uTime * 2.5) * 0.5 + 0.5;

      vec3 colorA = vec3(0.929, 0.353, 0.067); // #ED5A11 orange
vec3 colorB = vec3(0.0,0.0,0.0); // #0E0C0A blue


      float t1 = sin(uTime * 0.5 + dist * 6.0) * 0.5 + 0.5;
      

      vec3 color = mix(colorA, colorB, t1);
      

      // brighten peaks of the physical waves
      color += vWaveHeight * 8.0;

      float vignette = 1.0 - smoothstep(0.1, 0.4, dist);
vec3 edgeColor = vec3(0.055,0.047,0.039); // #120805
color = mix(edgeColor, color, vignette);

      gl_FragColor = vec4(color, uOpacity);
    }
  `,
);

extend({ WaveMaterial });

export function TeslaBackground({ visible }) {
  const meshRef = useRef();
  const matRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    if (!matRef.current) return;
    gsap.to(matRef.current, {
      uOpacity: visible ? 0.9 : 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
    // fade light in/out too
    if (lightRef.current) {
      gsap.to(lightRef.current, {
        intensity: visible ? 3 : 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [visible]);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uTime += delta;

    const t = matRef.current.uTime;
    const blend = Math.sin(t * 1) * 0.5 + 0.5; // 0 to 1

    // orange: [0.929, 0.353, 0.067]  blue: [0.063, 0.714, 0.933]
    lightRef.current.color.setRGB(
      0.929 * (1 - blend) + 0.063 * blend, // r
      0.353 * (1 - blend) + 0.714 * blend, // g
      0.067 * (1 - blend) + 0.933 * blend, // b
    );
  });
  return (
    <>
      {/* point light sitting just in front of the plane, behind headphones */}
      {/* this is what actually casts colored light onto the headphone mesh */}
      <pointLight
        ref={lightRef}
        position={[0, 0, -0.3]}
        intensity={3}
        distance={2}
        decay={1}
      />

      <mesh ref={meshRef} position={[0, 0, -0.3]}>
        {/* more segments = smoother physical waves */}
        <planeGeometry args={[0.9, 0.9, 32, 32]} />
        <waveMaterial
          ref={matRef}
          transparent
          depthWrite={false}
          uOpacity={0}
          uTime={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
