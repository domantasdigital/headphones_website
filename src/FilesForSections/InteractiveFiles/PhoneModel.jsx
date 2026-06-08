import { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function PhoneModel({ visible }) {
  const { scene } = useGLTF("/models/PhoneModel2.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    gsap.killTweensOf(modelRef.current.position);
    gsap.killTweensOf(modelRef.current.rotation);
    gsap.killTweensOf(modelRef.current.scale);

    if (visible) {
      modelRef.current.position.set(0.1, -0.5, 0);
      modelRef.current.rotation.set(0, Math.PI * 2, 0); // start with back facing camera
      modelRef.current.scale.set(1.2, 1.2, 1.2);

      gsap.to(modelRef.current.position, {
        x: 0.1,
        y: -0.1,
        z: 0.1,
        duration: 2.7,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.to(modelRef.current.rotation, {
        y: 0, // rotate to screen facing camera
        duration: 3,
        ease: "power3.out",
      });
    } else {
      // animate out
      gsap.to(modelRef.current.position, {
        y: 1,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.to(modelRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power1.inOut",
      });
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2, // rotate to screen facing camera
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, [visible]);

  const { gl } = useThree();

  const textures = useTexture(
    {
      lensAlbedo: "/phoneTextures/LensAlbedo.webp",
      screenAlbedo: "/phoneTextures/ScreenAlbedo.webp",
    },
    (loadedTextures) => {
      Object.values(loadedTextures).forEach((t) => {
        t.flipY = false;
        t.colorSpace = THREE.SRGBColorSpace;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.generateMipmaps = true;
        t.anisotropy = gl.capabilities.getMaxAnisotropy();
        t.needsUpdate = true;
      });
    },
  );

  scene.traverse((child) => {
    if (!child.isMesh) return;
    const name = child.name;
    child.material.needsUpdate = true;

    if (name.includes("Base1") || name.includes("base1")) {
      console.log("base1 is real");
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F07305"),
        roughness: 0.3,
        metalness: 0.9,
      });
    } else if (name.includes("Base2") || name.includes("base2")) {
      child.material = new THREE.MeshStandardMaterial({});
    } else if (name.includes("Base3") || name.includes("base3")) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F07305"),
        roughness: 0.3,
        metalness: 0.9,
      });
    } else if (name.includes("Base4") || name.includes("base4")) {
      child.material = new THREE.MeshStandardMaterial({});
    } else if (name.includes("Buttons") || name.includes("buttons")) {
      child.material = new THREE.MeshStandardMaterial({});
    } else if (name.includes("Lens") || name.includes("lens")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.lensAlbedo,
      });
    } else if (name.includes("Screen") || name.includes("screen")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.screenAlbedo,
        emissiveMap: textures.screenAlbedo, // same texture drives the glow
        emissive: new THREE.Color("#ffffff"), // color of the glow
        emissiveIntensity: 0.5, // higher = brighter glow
      });
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0} />;
}
