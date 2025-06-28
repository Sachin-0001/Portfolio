"use client";

import React, { useEffect, useRef } from "react";

interface NeuralLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const NeuralLoader: React.FC<NeuralLoaderProps> = ({
  size = "md",
  text = "Processing...",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      pulse: number;
    }> = [];
    const connections: Array<{ from: number; to: number; strength: number }> =
      [];

    // Create nodes
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.7) {
          connections.push({
            from: i,
            to: j,
            strength: Math.random(),
          });
        }
      }
    }

    let animationId: number;
    let time = 0;

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.05;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Draw connections
      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const distance = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);

        if (distance < 150) {
          const opacity = ((150 - distance) / 150) * conn.strength;
          const pulse = Math.sin(time * 0.01 + conn.from + conn.to) * 0.3 + 0.7;

          ctx.save();
          ctx.strokeStyle = `rgba(156, 39, 176, ${opacity * pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(node.pulse) * 0.3 + 0.7;
        const size = 4 + pulse * 3;

        ctx.save();
        ctx.fillStyle = `rgba(156, 39, 176, ${pulse})`;
        ctx.shadowColor = "#9C27B0";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      time++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        <canvas
          ref={canvasRef}
          width={size === "sm" ? 64 : size === "md" ? 96 : 128}
          height={size === "sm" ? 64 : size === "md" ? 96 : 128}
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple rounded-full animate-pulse" />
        </div>
      </div>
      {text && (
        <div className="text-center">
          <p className="text-gray-400 text-sm font-medium">{text}</p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-1 h-1 bg-purple rounded-full animate-bounce" />
            <div
              className="w-1 h-1 bg-purple rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-1 h-1 bg-purple rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralLoader;
