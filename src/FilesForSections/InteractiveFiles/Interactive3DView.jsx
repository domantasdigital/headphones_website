import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useHelper,
  Environment,
} from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Headphones() {
  const { scene } = useGLTF("/models/HeadphonesModel4.glb");

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

    if (child.isMesh) {
      console.log(`"${child.name}"`);
    } else {
      child.material = new THREE.MeshStandardMaterial({ color: "red" });
    }

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

  return <primitive object={scene} />;
}

function Lights() {
  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const rimLightRef = useRef();

  useHelper(keyLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(fillLightRef, THREE.DirectionalLightHelper, 1, "blue");
  useHelper(rimLightRef, THREE.DirectionalLightHelper, 1, "yellow");

  return (
    <>
      {/* <directionalLight
        ref={keyLightRef}
        position={[0.2, 0.3, 0.5]}
        intensity={8}
      />
      <directionalLight
        ref={fillLightRef}
        position={[-0.2, 0.3, 0.5]}
        intensity={5}
      />
      <directionalLight
        ref={rimLightRef}
        position={[0, 0.2, -0.5]}
        intensity={5}
      /> */}
    </>
  );
}

const Interactive3DView = () => {
  return (
    <div className="w-full h-full bg-grey-900">
      <Canvas camera={{ position: [0, 0.5, 2], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0} />
        <Lights />
        <Environment preset="city" environmentIntensity={1.5} />

        <Headphones />

        <OrbitControls enablePan={false} minDistance={0.7} maxDistance={1} />
      </Canvas>
    </div>
  );
};

export default Interactive3DView;
