import { useRef, useEffect, Suspense } from "react";
import { useTexture, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import useCameraAnimation from "./useCameraAnimation";
import useModelAnimation from "./useModelAnimation";

import { TeslaBackground } from "./TeslaBackground";
import { TouchIndicator } from "./TouchIndicator";
import { PhoneModel } from "./PhoneModel";

function Headphones({ activeId }) {
  const model = useGLTF("/models/HeadphonesModel5.glb");

  useEffect(() => {
    if (!headphonesModelRef.current) return;
    const box = new THREE.Box3().setFromObject(headphonesModelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    headphonesModelRef.current.position.sub(center);
  }, []);

  const headphonesModelRef = useRef();
  const cameraControlsRef = useRef();

  const { animate: animateCamera } = useCameraAnimation(cameraControlsRef);
  const { animate: animateModel } = useModelAnimation(headphonesModelRef);

  useEffect(() => {
    animateCamera(activeId);
    animateModel(activeId);
  }, [activeId]);

  const textures = useTexture({
    ausiniuCushionsAlbedo: "/headphoneTextures/AusiniuCushionsAlbedo.webp",
    ausiniuCushionsNormal: "/headphoneTextures/AusiniuCushionsNormal.webp",
    ausiniuPlastikasAlbedo: "/headphoneTextures/AusiniuPlastikasAlbedo.webp",

    ausiniuPlastikasRough: "/headphoneTextures/AusiniuPlastikasRough.webp",
    headbandAlbedo: "/headphoneTextures/HeadbandAlbedo.webp",
    headbandNormal: "/headphoneTextures/HeadbandNormal.webp",
    headbandRoughness: "/headphoneTextures/HeadbandRoughness.webp",
    miscPlastikasAlbedo: "/headphoneTextures/MiscPlastikasAlbedo.webp",
    miscPlastikasRough: "/headphoneTextures/MiscPlastikasRough.webp",
    miscPlastikasMetal: "/headphoneTextures/MiscPlastikasMetal.webp",
    wiresAlbedo: "/headphoneTextures/WiresAlbedo.webp",
  });
  // Fixing Tetures
  const colorTextures = [
    textures.ausiniuCushionsAlbedo,
    textures.ausiniuPlastikasAlbedo,
    textures.headbandAlbedo,
    textures.miscPlastikasAlbedo,
    textures.wiresAlbedo,
  ];

  const nonColorTextures = [
    textures.ausiniuCushionsNormal,

    textures.ausiniuPlastikasRough,
    textures.headbandNormal,
    textures.headbandRoughness,
    textures.miscPlastikasMetal,
    textures.miscPlastikasRough,
  ];

  colorTextures.forEach((t) => {
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  nonColorTextures.forEach((t) => {
    t.flipY = false;
    t.colorSpace = THREE.NoColorSpace;
  });

  return (
    <>
      {/* <Suspense> */}
      <OrbitControls
        ref={cameraControlsRef}
        enablePan={false}
        minDistance={0.5}
        maxDistance={0.7}
        enableDamping
        enabled={activeId === null || activeId === "view"}
      />
      <TeslaBackground visible={activeId === "tesla"} />
      <TouchIndicator visible={activeId === "touch"} />
      <PhoneModel visible={activeId === "sound"} />
      {/* <primitive ref={headphonesModelRef} object={model.scene} /> */}
      <group ref={headphonesModelRef}>
        <mesh geometry={model.nodes.AusiniuCushions.geometry}>
          <meshStandardMaterial
            map={textures.ausiniuCushionsAlbedo}
            normalMap={textures.ausiniuCushionsNormal}
          />
        </mesh>
        <mesh geometry={model.nodes.AusiniuPlastikas.geometry}>
          <meshStandardMaterial
            map={textures.ausiniuPlastikasAlbedo}
            roughnessMap={textures.ausiniuPlastikasRough}
          />
        </mesh>
        <mesh geometry={model.nodes.Headband.geometry}>
          <meshStandardMaterial
            map={textures.headbandAlbedo}
            normalMap={textures.headbandNormal}
            roughnessMap={textures.headbandRoughness}
          />
        </mesh>
        <mesh geometry={model.nodes.MetaloSujungimas.geometry}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.5}
          />
        </mesh>
        <mesh geometry={model.nodes.MiscPlastikas.geometry}>
          <meshStandardMaterial
            map={textures.miscPlastikasAlbedo}
            roughnessMap={textures.miscPlastikasRough}
            metalnessMap={textures.miscPlastikasMetal}
          />
        </mesh>
        <mesh geometry={model.nodes.Wires.geometry}>
          <meshStandardMaterial map={textures.wiresAlbedo} />
        </mesh>
      </group>
      {/* </Suspense> */}
    </>
  );
}

export default Headphones;
