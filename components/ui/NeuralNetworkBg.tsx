"use client";
import React, { useEffect, useRef } from "react";

// Animated neural network background using Canvas
const NODE_COUNT = 18;
const LAYER_COUNT = 4;
const COLORS = [
  "#6C00A2", // purple
  "#001152", // dark blue
  "#1271FF", // blue
  "#DD4AFF", // magenta
  "#64DCFF", // cyan
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const NeuralNetworkBg: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Generate nodes for each layer
    const layers: { x: number; y: number; baseY: number; color: string }[][] =
      [];
    for (let l = 0; l < LAYER_COUNT; l++) {
      const nodes = [];
      for (let n = 0; n < NODE_COUNT; n++) {
        const x = ((l + 1) / (LAYER_COUNT + 1)) * width;
        const y = ((n + 1) / (NODE_COUNT + 1)) * height;
        nodes.push({
          x,
          y,
          baseY: y,
          color: COLORS[l % COLORS.length],
        });
      }
      layers.push(nodes);
    }

    function animate(t: number) {
      ctx.clearRect(0, 0, width, height);
      // Draw connections
      for (let l = 0; l < LAYER_COUNT - 1; l++) {
        for (let n = 0; n < NODE_COUNT; n++) {
          const nodeA = layers[l][n];
          for (let m = 0; m < NODE_COUNT; m++) {
            const nodeB = layers[l + 1][m];
            ctx.save();
            ctx.globalAlpha = 0.08;
            ctx.strokeStyle = COLORS[(l + m) % COLORS.length];
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // Animate and draw nodes
      for (let l = 0; l < LAYER_COUNT; l++) {
        for (let n = 0; n < NODE_COUNT; n++) {
          const node = layers[l][n];
          // Animate y position with a subtle sine wave
          node.y = node.baseY + Math.sin(t / 900 + l * 2 + n) * 12;
          ctx.save();
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            7 + 2 * Math.sin(t / 700 + n),
            0,
            2 * Math.PI
          );
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animate(0);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
      width={1920}
      height={1080}
      aria-hidden="true"
    />
  );
};

export default NeuralNetworkBg;
