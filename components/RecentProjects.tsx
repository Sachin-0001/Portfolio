"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <div
      className="py-20"
      id="projects"
      style={{ fontFamily: "'Neue Aachen Pro', Arial, sans-serif" }}
    >
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
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
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
