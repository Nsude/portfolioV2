import ProjectsList from "./ProjectsList";
import PreviewModal from "./PreviewModal";
import SplitLineText from "../global/SplitLineText";
import { useRef, useState } from "react";

const listItems = [
  {
    name: "Marcette Website",
    services: "Development",
    duration: "8 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
    color: "#5DEA7C",
  },
  {
    name: "Harlow eCommerce",
    services: "Design & Development",
    duration: "14 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
    color: "#E3E3E3",
  },
  {
    name: "Polygene Webapp",
    services: "Development",
    duration: "8 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
    color: "#F2F2F2",
  },
  {
    name: "Daisy’s Landing Page",
    services: "Design & Development",
    duration: "10 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
    color: "#121212",
  },
  {
    name: "Count Dane Website",
    services: "Design & Development",
    duration: "14 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
    color: "#DDD",
  },
  {
    name: "Johnny Website",
    services: "Design & Development",
    duration: "12 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
    color: "pink",
  },
];

const Projects = () => {
  const [activePreview, setActivePreview] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const containerRef = useRef();
  const modalRef = useRef();

  return (
    <section
      ref={containerRef}
      onMouseEnter={(e) => setModalActive(true)}
      onMouseLeave={(e) => setModalActive(false)}
      className="w-full h-fit text-60-title relative group"
    >
      <div className=" relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h opacity-45 text-14-body">
        <div className="basis-[50%] lg:basis-[20%] text-left">
          <SplitLineText text={"Project"} />
        </div>

        <div className="basis-[50%] justify-between hidden lg:flex">
          <SplitLineText text={"Services"} />
          <SplitLineText text={"Duration"} />
        </div>

        <div className="basis-[50%] lg:basis-[20%] text-right">
          <SplitLineText text={"Year"} />
        </div>
      </div>

      <div>
        {[...listItems, ...listItems].map(
          ({ name, services, year, duration }, i) => (
            <ProjectsList
              key={i}
              name={name}
              services={services}
              year={year}
              duration={duration}
              handleMouseEnter={() => setActivePreview(i)}
            />
          )
        )}

        <PreviewModal
          projects={[...listItems, ...listItems]}
          activePreview={activePreview}
          modalActive={modalActive}
        />
      </div>
    </section>
  );
};

export default Projects;
