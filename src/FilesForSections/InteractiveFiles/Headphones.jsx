import { useRef, useEffect, useMemo } from "react";
import { useTexture, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import useCameraAnimation from "./useCameraAnimation";
import useModelAnimation from "./useModelAnimation";

import { TeslaBackground } from "./TeslaBackground";
import { TouchIndicator } from "./TouchIndicator";
import { PhoneModel } from "./PhoneModel";

function Headphones({ activeId }) {
  const { scene } = useGLTF("/models/HeadphonesModel5.glb");

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  const headphonesModelRef = useRef();
  const cameraControlsRef = useRef();

  const { animate: animateCamera } = useCameraAnimation(cameraControlsRef);
  const { animate: animateModel } = useModelAnimation(headphonesModelRef);

  useEffect(() => {
    animateCamera(activeId);
    animateModel(activeId);
  }, [activeId]);

  // const textures = useTexture({
  //   ausiniuCushionsAlbedo: "/headphoneTextures/AusiniuCushionsAlbedo.webp",
  //   ausiniuCushionsNormal: "/headphoneTextures/AusiniuCushionsNormal.webp",
  //   ausiniuPlastikasAlbedo: "/headphoneTextures/AusiniuPlastikasAlbedo.webp",
  //   ausiniuPlastikasNormal: "/headphoneTextures/AusiniuPlastikasNormal.webp",
  //   ausiniuPlastikasRough: "/headphoneTextures/AusiniuPlastikasRough.webp",
  //   headbandAlbedo: "/headphoneTextures/HeadbandAlbedo.webp",
  //   headbandNormal: "/headphoneTextures/HeadbandNormal.webp",
  //   headbandRoughness: "/headphoneTextures/HeadbandRoughness.webp",
  //   miscPlastikasAlbedo: "/headphoneTextures/MiscPlastikasAlbedo.webp",
  //   miscPlastikasRough: "/headphoneTextures/MiscPlastikasRough.webp",
  //   miscPlastikasMetal: "/headphoneTextures/MiscPlastikasMetal.webp",
  //   wiresAlbedo: "/headphoneTextures/WiresAlbedo.webp",
  // });

  // const materials = useMemo(() => {
  //   const albedo = [
  //     textures.ausiniuCushionsAlbedo,
  //     textures.ausiniuPlastikasAlbedo,
  //     textures.headbandAlbedo,
  //     textures.wiresAlbedo,
  //     textures.miscPlastikasAlbedo,
  //   ];
  //   albedo.forEach((t) => {
  //     if (!t) return;
  //     t.flipY = false;
  //     t.colorSpace = THREE.SRGBColorSpace;
  //     t.needsUpdate = true;
  //   });

  //   const nonColor = [
  //     textures.ausiniuCushionsNormal,
  //     textures.ausiniuPlastikasNormal,
  //     textures.ausiniuPlastikasRough,
  //     textures.headbandNormal,
  //     textures.headbandRoughness,
  //     textures.miscPlastikasRough,
  //     textures.miscPlastikasMetal,
  //   ];
  //   nonColor.forEach((t) => {
  //     if (!t) return;
  //     t.flipY = false;
  //     t.colorSpace = THREE.NoColorSpace;
  //     t.needsUpdate = true;
  //   });

  //   return {
  //     cushion: new THREE.MeshStandardMaterial({
  //       map: textures.ausiniuCushionsAlbedo,
  //       normalMap: textures.ausiniuCushionsNormal,
  //       roughness: 0.9,
  //     }),
  //     plastic: new THREE.MeshStandardMaterial({
  //       map: textures.ausiniuPlastikasAlbedo,
  //       roughnessMap: textures.ausiniuPlastikasRough,
  //     }),
  //     metal: new THREE.MeshStandardMaterial({
  //       roughness: 0.2,
  //       metalness: 0.8,
  //     }),
  //     headband: new THREE.MeshStandardMaterial({
  //       map: textures.headbandAlbedo,
  //       normalMap: textures.headbandNormal,
  //       roughnessMap: textures.headbandRoughness,
  //     }),
  //     wire: new THREE.MeshStandardMaterial({
  //       map: textures.wiresAlbedo,
  //     }),
  //     miscPlastic: new THREE.MeshStandardMaterial({
  //       color: "black",
  //       roughnessMap: textures.miscPlastikasRough,
  //       metalnessMap: textures.miscPlastikasMetal,
  //     }),
  //   };
  // }, [textures]);

  // useEffect(() => {
  //   scene.traverse((child) => {
  //     if (!child.isMesh) return;
  //     const name = child.name;

  //     if (name.includes("Cushion") || name.includes("cushion")) {
  //       child.material = materials.cushion;
  //     } else if (name.includes("Ausiniu") || name.includes("ausiniu")) {
  //       child.material = materials.plastic;
  //     } else if (name.includes("Metal") || name.includes("metal")) {
  //       child.material = materials.metal;
  //     } else if (name.includes("Headband") || name.includes("headband")) {
  //       child.material = materials.headband;
  //     } else if (name.includes("Wire") || name.includes("wire")) {
  //       child.material = materials.wire;
  //     } else if (name.includes("MiscPlastikas")) {
  //       child.material = materials.miscPlastic;
  //     }
  //   });
  // }, [scene, materials]);

  return (
    <>
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
      <primitive ref={headphonesModelRef} object={scene} />
    </>
  );
}

export default Headphones;
