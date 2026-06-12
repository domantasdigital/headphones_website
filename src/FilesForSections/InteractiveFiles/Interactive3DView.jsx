import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Headphones from "./Headphones";

const Interactive3DView = ({ activeId }) => {
  return (
    <div className="w-full h-full bg-[#0e0c0a]">
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        {/* Lights */}
        {/* <ambientLight intensity={0} /> */}

        {/* <Environment preset="city" environmentIntensity={1.5} /> */}

        {/* <Headphones activeId={activeId} /> */}
        {/* Everything below is testing ----------*/}
        <ambientLight intensity={1} />
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        {/* Everything above is testing-------- */}
      </Canvas>
    </div>
  );
};

export default Interactive3DView;
