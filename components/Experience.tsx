import React, { useEffect, useState } from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import NeuralNetworkBg from "./ui/NeuralNetworkBg";

const mlBadges = [
  { name: "Neural Networks", icon: "/ML/tf.svg" },
  { name: "Model Deployment", icon: "/ML/pt.svg" },
  { name: "Data Science", icon: "/ML/sl.svg" },
  { name: "Deep Learning", icon: "/ML/k.svg" },
  { name: "NLP", icon: "/ML/p.svg" },
  { name: "Computer Vision", icon: "/ML/n.svg" },
];

const techBadges = [
  { name: "JavaScript", icon: "/js.png" },
  { name: "TypeScript", icon: "/ts.svg" },
  { name: "React", icon: "/re.svg" },
  { name: "Next.js", icon: "/next.svg" },
  // { name: "Node.js", icon: "/node.png" },
  // { name: "Docker", icon: "/docker.png" },
  // { name: "PostgreSQL", icon: "/postgres.png" },
  { name: "MongoDB", icon: "/mongodb.png" },
  // { name: "HTML", icon: "/html.png" },
  { name: "CSS", icon: "/css.png" },
  { name: "Tailwind", icon: "/tail.svg" },
  { name: "Git", icon: "/git.svg" },
  { name: "Java", icon: "/java.png" },
  // { name: "Ansible", icon: "/Tech/ansible.svg" },
  // { name: "Terraform", icon: "/Tech/terraform.svg" },
];

const Experience = () => {
  // Simulate animated proficiency bars
  const [proficiency, setProficiency] = useState<number[]>(
    workExperience.map(() => 0)
  );
  useEffect(() => {
    let frame: number;
    function animate() {
      setProficiency((prev) =>
        prev.map((val, i) => {
          const target = (workExperience[i] as any).proficiency ?? 0;
          return val < target ? val + 0.5 : target;
        })
      );
      setTimeout(() => {
        setProficiency((current) => {
          if (
            current.some(
              (val, i) => val < ((workExperience[i] as any).proficiency ?? 0)
            )
          ) {
            animate();
          }
          return current;
        });
      }, 16);
    }
    animate();
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="py-20 w-full relative overflow-hidden"
      id="techstack"
      style={{ fontFamily: "'Neue Aachen Pro', Arial, sans-serif" }}
    >
      {/* Neural Network background overlay */}
      <NeuralNetworkBg style={{ opacity: 0.12, zIndex: 0 }} />
      <h1 className="heading">
        My <span className="text-purple">Tech Stack</span>
      </h1>
      {/* ML Badges with icons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mt-10 mb-4 z-10 relative">
        {mlBadges.map((badge) => (
          <span
            key={badge.name}
            className="flex items-center gap-3 bg-purple-900/70 text-purple-200 px-6 py-3 rounded-full text-2xl font-semibold border border-purple-400/30 shadow-sm"
          >
            {badge.icon && (
              <img src={badge.icon} alt={badge.name} className="w-7 h-7" />
            )}
            {badge.name}
          </span>
        ))}
      </div>
      {/* Tech Badges with icons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mb-8 z-10 relative">
        {techBadges.map((badge) => (
          <span
            key={badge.name}
            className="flex items-center gap-3 bg-purple-900/70 text-blue-200 px-6 py-3 rounded-full text-2xl font-semibold border border-blue-400/30 shadow-sm"
          >
            {badge.icon && (
              <img src={badge.icon} alt={badge.name} className="w-7 h-7" />
            )}
            {badge.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Experience;
