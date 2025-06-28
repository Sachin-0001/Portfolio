"use client";

import React, { useState, useEffect } from "react";
import { FaBrain, FaLightbulb } from "react-icons/fa";

interface SmartRecommendationsProps {
  currentProjectId?: number;
  userInterests: string[];
  onRecommendationClick: (projectId: number) => void;
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  currentProjectId,
  userInterests,
  onRecommendationClick,
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ML-inspired recommendation algorithm
  const generateRecommendations = () => {
    setIsAnalyzing(true);

    // Simulate ML processing time
    setTimeout(() => {
      const { projects } = require("@/data");

      // Calculate similarity scores based on tags and user interests
      const scoredProjects = projects
        .filter((p: any) => p.id !== currentProjectId)
        .map((project: any) => {
          const tagOverlap =
            project.tags?.filter((tag: string) => userInterests.includes(tag))
              .length || 0;

          const score = tagOverlap * 0.6 + Math.random() * 0.4; // ML-inspired scoring

          return { ...project, score };
        })
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 3);

      setRecommendations(scoredProjects);
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    if (userInterests.length > 0) {
      generateRecommendations();
    }
  }, [userInterests, currentProjectId]);

  if (userInterests.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple/10 to-blue/10 rounded-2xl p-6 border border-purple/20 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <FaBrain className="text-purple text-xl" />
          {isAnalyzing && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-white">
          {isAnalyzing ? "Analyzing your preferences..." : "AI Recommendations"}
        </h3>
      </div>

      {isAnalyzing ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple rounded-full animate-bounce" />
            <span className="text-gray-400 text-sm">
              Processing user behavior...
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-purple rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span className="text-gray-400 text-sm">
              Calculating similarity scores...
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-purple rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
            <span className="text-gray-400 text-sm">
              Generating recommendations...
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm mb-4">
            Based on your interest in{" "}
            <span className="text-purple font-medium">
              {userInterests.slice(0, 2).join(", ")}
            </span>
            , you might like:
          </p>

          {recommendations.map((project, index) => (
            <div
              key={project.id}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => onRecommendationClick(project.id)}
            >
              <div className="w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center">
                <span className="text-purple text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium group-hover:text-purple transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-xs line-clamp-1">
                  {project.des}
                </p>
              </div>
              <FaLightbulb className="text-yellow-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
