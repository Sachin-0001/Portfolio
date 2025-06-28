import React, { useEffect, useState } from "react";

import { workExperience } from "@/data";
import NeuralNetworkBg from "./ui/NeuralNetworkBg";
import SkillRadar from "./ui/SkillRadar";

const mlBadges = [
  { name: "Data Science", icon: "/ML/sl.svg" },
  { name: "Neural Networks", icon: "/ML/tf.svg" },
  { name: "Deep Learning", icon: "/ML/k.svg" },
  { name: "NLP", icon: "/ML/p.svg" },
  { name: "Computer Vision", icon: "/ML/n.svg" },
  // { name: "Model Deployment", icon: "/ML/pt.svg" },
];

const techBadges = [
  { name: "Next.js", icon: "/next.svg" },
  { name: "React", icon: "/re.svg" },
  { name: "JavaScript", icon: "/js.png" },
  { name: "TypeScript", icon: "/ts.svg" },
  { name: "Java", icon: "/java.png" },
  { name: "Python", icon: "/py.png" },
  { name: "C++", icon: "/c++.png" },
  { name: "C", icon: "/c.png" },
  { name: "Node.js", icon: "/node.png" },
  // { name: "Docker", icon: "/docker.png" },
  // { name: "PostgreSQL", icon: "/postgres.png" },
  { name: "MongoDB", icon: "/mongodb.png" },
  { name: "HTML", icon: "/2.png" },
  { name: "CSS", icon: "/css.png" },
  { name: "Bootstrap", icon: "/boot.png" },
  { name: "Tailwind", icon: "/tail.svg" },
  { name: "Git", icon: "/git.svg" },
  // { name: "Ansible", icon: "/Tech/ansible.svg" },
  // { name: "Terraform", icon: "/Tech/terraform.svg" },
];

// Skill data for the radar chart
const skillData = [
  { name: "React", level: 80, category: "Frontend", color: "#61DAFB" }, // official
  { name: "Next.js", level: 80, category: "Frontend", color: "#000000" }, // official (black)
  { name: "JavaScript", level: 90, category: "Programming", color: "#F7DF1E" }, // official yellow
  { name: "Python", level: 65, category: "Programming", color: "#3776AB" }, // official
  { name: "Machine Learning", level: 50, category: "AI/ML", color: "#FF6B6B" }, // custom (warm red for AI)
  { name: "Node.js", level: 70, category: "Backend", color: "#339933" }, // official green
  { name: "MongoDB", level: 65, category: "Database", color: "#47A248" }, // official green
  { name: "TypeScript", level: 75, category: "Programming", color: "#3178C6" }, // official blue
  { name: "Java", level: 60, category: "Programming", color: "#EA2D2E" }, // red from official Oracle Java logo
  { name: "C++", level: 75, category: "Programming", color: "#00599C" }, // official ISO C++ blue
  { name: "Tailwind", level: 90, category: "Frontend", color: "#38BDF8" }, // official
];

const Experience = () => {
  // Simulate animated proficiency bars
  const [proficiency, setProficiency] = useState<number[]>(
    workExperience.map(() => 0)
  );
  const [showSkillRadar, setShowSkillRadar] = useState(false);

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
      <h1 className="heading mb-10">
        My <span className="text-purple">Tech Stack</span>
      </h1>

      {/* AI Skill Analysis Button */}
      <div className="text-center mb-8 z-10 relative">
        <button
          onClick={() => setShowSkillRadar(!showSkillRadar)}
          className="flex items-center gap-2 px-6 py-3 bg-purple/20 text-purple rounded-full hover:bg-purple/30 transition-colors mx-auto border border-purple/30"
        >
          <span className="text-xl font-medium">
            {showSkillRadar ? "Hide" : "Show"} AI Skill Analysis
          </span>
        </button>
      </div>

      {/* Skill Radar Chart */}
      {showSkillRadar && (
        <div className="mb-12 z-10 relative">
          <SkillRadar skills={skillData} size="lg" />
        </div>
      )}

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
