import { Canvas } from "@react-three/fiber";
import { Environment, Loader } from "@react-three/drei";
import { Suspense } from "react";
import Headphones from "./Headphones";

const Interactive3DView = ({ activeId }) => {
  return (
    <div className="w-full h-full bg-[#0e0c0a]">
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <Suspense>
          <Environment preset="city" environmentIntensity={1.5} />

          <Headphones activeId={activeId} />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: "rgba(14, 12, 10, 0)" }} // the overlay background
        innerStyles={{ background: "#0E0C0A" }} // the bar container background
        barStyles={{ background: "#ED5A11" }} // the progress bar itself
        dataStyles={{
          color: "#ffffff",
          fontFamily: '"Geist", sans-serif',
          fontSize: "16px",
        }} // the percentage text
        dataInterpolation={(p) => `Loading... ${p.toFixed(0)}%`} // custom text format
      />
    </div>
  );
};

export default Interactive3DView;
