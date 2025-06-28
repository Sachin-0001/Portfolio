import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import NeuralNetworkBg from "./ui/NeuralNetworkBg";
import React, { useEffect, useState } from "react";

const Hero = () => {
  // Animated accuracy bar state
  const [accuracy, setAccuracy] = useState(0);
  useEffect(() => {
    let frame: number;
    function animate() {
      setAccuracy((prev) => (prev < 97 ? prev + 0.2 : 97));
      if (accuracy < 97) frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="pb-20 pt-36 relative overflow-hidden"
      id="home"
      style={{ fontFamily: "'Neue Aachen Pro', Arial, sans-serif" }}
    >
      {/* Neural Network animated background */}
      <NeuralNetworkBg style={{ opacity: 0.32, zIndex: 0 }} />

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xl text-center text-blue-100 max-w-100">
            Welcome
          </p>

          <TextGenerateEffect
            words="Hi! I'm Sachin,"
            className="text-[40px] md:text-5xl lg:text-6xl"
          />
          <TextGenerateEffect
            words="I'm into turning data into smart ideas."
            className="text-[40px] md:text-5xl lg:text-6xl"
          />

          {/* ML subheading */}
          <p className="text-center mt-2 mb-4 text-sm md:text-lg lg:text-2xl text-purple-200 font-light">
            Full Stack Developer • ML Explorer • AI in Progress • Building & Learning
            Everyday
          </p>

          {/* Animated accuracy bar */}
          <div className="w-full max-w-xs bg-[#181A2A] rounded-full h-4 mb-2 border border-purple-400/30 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${accuracy}%`,
                background: `hsl(${Math.round(
                  (accuracy / 100) * 120
                )}, 80%, 60%)`,
              }}
            ></div>
          </div>
          <div className="w-full max-w-xs text-center text-purple-200 font-mono text-sm mb-6">
            Building Accuracy: {accuracy.toFixed(1)}%
          </div>

          <a href="#projects">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
