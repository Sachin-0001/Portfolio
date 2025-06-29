"use client";

import { useState, useMemo } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import ProjectFilter from "./ProjectFilter";
import SmartRecommendations from "./SmartRecommendations";
import NeuralLoader from "./ui/NeuralLoader";

const RecentProjects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Get all unique tags from projects
  const availableTags = useMemo(() => {
    const tags = projects.flatMap((project) => project.tags || []);
    return Array.from(new Set(tags)).sort();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0 || selectedTags.includes("All")) {
      return projects;
    }
    return projects.filter((project) =>
      project.tags?.some((tag) => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  const handleTagToggle = (tag: string) => {
    if (tag === "All") {
      setSelectedTags([]);
    } else {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  const handleRecommendationClick = (projectId: number) => {
    // Scroll to the specific project
    const projectElement = document.getElementById(`project-${projectId}`);
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  return (
    <div
      className="py-20"
      id="projects"
      style={{ fontFamily: "'Neue Aachen Pro', Arial, sans-serif" }}
    >
      <h1 className="heading mb-20">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>

      <ProjectFilter
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        availableTags={availableTags}
      />

      {/* AI Recommendations Section */}
      {selectedTags.length > 0 && (
        <div className="mb-8">
          <button
            onClick={toggleRecommendations}
            className="flex items-center gap-2 px-4 py-2 bg-purple/20 text-purple rounded-full hover:bg-purple/30 transition-colors mx-auto"
          >
            <span className="text-xl font-medium">
              {showRecommendations ? "Hide" : "Show"} AI Recommendations
            </span>
          </button>

          {showRecommendations && (
            <div className="mt-6 max-w-2xl mx-auto">
              <SmartRecommendations
                userInterests={selectedTags}
                onRecommendationClick={handleRecommendationClick}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-20">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <NeuralLoader size="lg" text="Loading projects..." />
          </div>
        ) : (
          filteredProjects.map((item) => (
            <div
              id={`project-${item.id}`}
              className="lg:min-h-[25rem] h-[20rem] flex items-center justify-center sm:w-80 w-[70vw]"
              key={item.id}
            >
              <PinContainer
                title={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative flex items-center justify-center sm:w-80 w-[70vw] overflow-hidden h-[15vh] lg:h-[25vh] mb-8">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img src="/bg.png" alt="bgimg" />
                  </div>
                  <img
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0 h-full w-full"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-lg text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                {/* Tags display */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0,3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-purple/20 text-purple rounded-full border border-purple/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-white/10 text-gray-400 rounded-full">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-5 mb-2">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-8 lg:h-8 w-6 h-6 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${4 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt="icon5" className="p-1" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-lg md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-2" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          ))
        )}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">
            No projects found with the selected filters.
          </p>
          <button
            onClick={() => setSelectedTags([])}
            className="mt-4 px-6 py-2 bg-purple text-white rounded-full hover:bg-purple/80 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
