import ProjectsList from "./ProjectsList";
import PreviewModal from "./PreviewModal";
import SplitLineText from "../global/SplitLineText";
import { useRef, useState } from "react";
import { projectList } from "../global/DummyData";

const Projects = () => {
  const [activePreview, setActivePreview] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const containerRef = useRef();

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
        {[...projectList, ...projectList].map(
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
          projects={[...projectList, ...projectList]}
          activePreview={activePreview}
          modalActive={modalActive}
        />
      </div>
    </section>
  );
};

export default Projects;
