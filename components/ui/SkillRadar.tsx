"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaBrain, FaChartLine } from "react-icons/fa";

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  color: string;
}

interface SkillRadarProps {
  skills: Skill[];
  size?: "sm" | "md" | "lg";
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills, size = "md" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    // Simulate AI analysis
    setTimeout(() => setIsAnalyzing(false), 2000);

    let animationId: number;
    let time = 0;

    function drawRadar() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Draw radar grid
      const levels = 5;
      for (let i = 1; i <= levels; i++) {
        const currentRadius = (radius * i) / levels;

        ctx.save();
        ctx.strokeStyle = `rgba(156, 39, 176, ${0.1 + i * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw axis lines
      const numSkills = skills.length;
      for (let i = 0; i < numSkills; i++) {
        const angle = (i * 2 * Math.PI) / numSkills - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.save();
        ctx.strokeStyle = "rgba(156, 39, 176, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw skill points and connections
      if (!isAnalyzing) {
        const points: Array<{ x: number; y: number; skill: Skill }> = [];

        skills.forEach((skill, i) => {
          const angle = (i * 2 * Math.PI) / numSkills - Math.PI / 2;
          const skillRadius = (radius * skill.level) / 100;
          const x = centerX + Math.cos(angle) * skillRadius;
          const y = centerY + Math.sin(angle) * skillRadius;

          points.push({ x, y, skill });

          // Draw skill point
          const pulse = Math.sin(time * 0.02 + i) * 0.3 + 0.7;
          const isHovered = hoveredSkill === skill.name;

          ctx.save();
          ctx.fillStyle = skill.color;
          ctx.shadowColor = skill.color;
          ctx.shadowBlur = isHovered ? 20 : 10;
          ctx.beginPath();
          ctx.arc(x, y, isHovered ? 8 : 6 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Draw skill name
          const textX = centerX + Math.cos(angle) * (radius + 20);
          const textY = centerY + Math.sin(angle) * (radius + 20);

          ctx.save();
          ctx.fillStyle = isHovered ? skill.color : "rgba(255, 255, 255, 0.7)";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(skill.name, textX, textY);
          ctx.restore();
        });

        // Draw connections between points
        ctx.save();
        ctx.strokeStyle = "rgba(156, 39, 176, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Draw neural network connections
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const distance = Math.sqrt(
              (points[i].x - points[j].x) ** 2 +
                (points[i].y - points[j].y) ** 2
            );

            if (distance < radius * 0.8) {
              const opacity = (1 - distance / (radius * 0.8)) * 0.3;
              const pulse = Math.sin(time * 0.01 + i + j) * 0.2 + 0.8;

              ctx.save();
              ctx.strokeStyle = `rgba(156, 39, 176, ${opacity * pulse})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      time++;
      animationId = requestAnimationFrame(drawRadar);
    }

    drawRadar();

    return () => cancelAnimationFrame(animationId);
  }, [skills, hoveredSkill, isAnalyzing]);

  const sizeClasses = {
    sm: "w-64 h-64",
    md: "w-80 h-80",
    lg: "w-96 h-96",
  };

  const canvasSize = size === "sm" ? 256 : size === "md" ? 320 : 384;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <FaBrain className="text-purple text-xl" />
        <h3 className="text-lg font-semibold text-white">AI Skill Analysis</h3>
        {isAnalyzing && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Analyzing...</span>
          </div>
        )}
      </div>

      <div className={`relative ${sizeClasses[size]}`}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="rounded-lg border border-purple/20"
          onMouseMove={(e) => {
            // Add hover detection logic here if needed
          }}
        />

        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center">
              <FaChartLine className="text-purple text-2xl mx-auto mb-2 animate-pulse" />
              <p className="text-gray-300 text-sm">Processing skill data...</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-white text-sm">{skill.name}</span>
            <span className="text-gray-400 text-xs ml-auto">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRadar;
