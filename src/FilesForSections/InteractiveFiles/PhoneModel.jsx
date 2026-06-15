import { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function PhoneModel({ visible }) {
  const phoneModel = useGLTF("/models/PhoneModel2.glb");
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
      lensAlbedo: "/phoneTextures/LensAlbedo.avif",
      screenAlbedo: "/phoneTextures/ScreenAlbedo.avif",
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

  return (
    <group ref={modelRef} scale={[0, 0, 0]} position={[0.1, 1, 0]}>
      <mesh geometry={phoneModel.nodes.Base1.geometry}>
        <meshStandardMaterial color="#F07305" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh geometry={phoneModel.nodes.Base2.geometry}>
        <meshStandardMaterial color="#F07305" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh geometry={phoneModel.nodes.Base3.geometry}>
        <meshStandardMaterial color="#F07305" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh geometry={phoneModel.nodes.Base4.geometry}>
        <meshStandardMaterial
          color="#000000FF"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      <mesh geometry={phoneModel.nodes.Butttons.geometry}>
        <meshStandardMaterial color="#F07305" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh geometry={phoneModel.nodes.Lens.geometry}>
        <meshStandardMaterial map={textures.lensAlbedo} roughness={0.5} />
      </mesh>
      <mesh geometry={phoneModel.nodes.Screen.geometry}>
        <meshStandardMaterial
          map={textures.screenAlbedo}
          emissiveMap={textures.screenAlbedo}
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
