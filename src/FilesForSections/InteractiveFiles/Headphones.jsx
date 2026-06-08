import { useRef, useEffect } from "react";
import { useTexture, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import useCameraAnimation from "./useCameraAnimation";
import useModelAnimation from "./useModelAnimation";

import { TeslaBackground } from "./TeslaBackground";
import { TouchIndicator } from "./TouchIndicator";
import { PhoneModel } from "./PhoneModel";

function Headphones({ activeId }) {
  const { scene } = useGLTF("/models/HeadphonesModel5.glb");

  // Center the model
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center); // shifts model so its center = world origin
  }, [scene]);

  const headphonesModelRef = useRef();
  const cameraControlsRef = useRef();

  //   destruycturing
  const { animate: animateCamera } = useCameraAnimation(cameraControlsRef);
  const { animate: animateModel } = useModelAnimation(headphonesModelRef);

  // fires every time a button is clicked
  useEffect(() => {
    animateCamera(activeId);
    animateModel(activeId);
  }, [activeId]);

  const textures = useTexture({
    // Cushions
    ausiniuCushionsAlbedo: "/headphoneTextures/AusiniuCushionsAlbedo.webp",
    ausiniuCushionsNormal: "/headphoneTextures/AusiniuCushionsNormal.webp",
    // Plastikas (ear cup plastic)
    ausiniuPlastikasAlbedo: "/headphoneTextures/AusiniuPlastikasAlbedo.webp",
    ausiniuPlastikasNormal: "/headphoneTextures/AusiniuPlastikasNormal.webp",
    ausiniuPlastikasRough: "/headphoneTextures/AusiniuPlastikasRough.webp",
    // Headband
    headbandAlbedo: "/headphoneTextures/HeadbandAlbedo.webp",
    headbandNormal: "/headphoneTextures/HeadbandNormal.webp",
    headbandRoughness: "/headphoneTextures/HeadbandRoughness.webp",
    // Misc plastikas
    miscPlastikasAlbedo: "/headphoneTextures/MiscPlastikasAlbedo.webp",
    miscPlastikasMetalness: "/headphoneTextures/MiscPlastikasMetal.webp",
    miscPlastikasRough: "/headphoneTextures/MicPlastikasRough.webp",
    miscPlastikasMetal: "/headphoneTextures/MiscPlastikasMetal.webp",
    // Wires
    wiresAlbedo: "/headphoneTextures/WiresAlbedo.webp",
  });

  // Fix texture color space for albedo maps
  const albedoMaps = [
    textures.ausiniuCushionsAlbedo,
    textures.ausiniuPlastikasAlbedo,
    textures.headbandAlbedo,
    textures.wiresAlbedo,
    textures.miscPlastikasAlbedo,
  ];
  albedoMaps.forEach((t) => {
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  // Fix texture color space for noncolor maps
  const nonColorMaps = [
    textures.ausiniuCushionsNormal,
    textures.ausiniuPlastikasNormal,
    textures.ausiniuPlastikasRough,
    textures.headbandNormal,
    textures.headbandRoughness,
    textures.miscPlastikasRough,
    textures.miscPlastikasMetal,
  ];
  nonColorMaps.forEach((t) => {
    t.flipY = false;
    t.colorSpace = THREE.NoColorSpace;
  });

  scene.traverse((child) => {
    if (!child.isMesh) return;
    const name = child.name;

    if (name.includes("Cushion") || name.includes("cushion")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.ausiniuCushionsAlbedo,
        normalMap: textures.ausiniuCushionsNormal,
        roughness: 0.9,
      });
    } else if (name.includes("Ausiniu") || name.includes("ausiniu")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.ausiniuPlastikasAlbedo,

        roughnessMap: textures.ausiniuPlastikasRough,
      });
    } else if (name.includes("Metal") || name.includes("metal")) {
      child.material = new THREE.MeshStandardMaterial({
        roughness: 0.2,
        metalness: 0.8,
      });
    } else if (name.includes("Headband") || name.includes("headband")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.headbandAlbedo,
        normalMap: textures.headbandNormal,
        roughnessMap: textures.headbandRoughness,
      });
    } else if (name.includes("Wire") || name.includes("wire")) {
      child.material = new THREE.MeshStandardMaterial({
        map: textures.wiresAlbedo,
      });
    } else if (name.includes("MiscPlastikas")) {
      child.material = new THREE.MeshStandardMaterial({
        color: "black",
        roughnessMap: textures.miscPlastikasRough,
        metalnessMap: textures.miscPlastikasMetal,
      });
    }
  });

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
