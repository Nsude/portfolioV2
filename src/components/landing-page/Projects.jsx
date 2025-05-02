import ProjectsList from "./ProjectsList";
import PreviewModal from "./PreviewModal";
import SplitLineText from "../global/SplitLineText";

const listItems = [
  {
    name: "Marcette Website",
    services: "Development",
    duration: "8 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
  },
  {
    name: "Harlow eCommerce",
    services: "Design & Development",
    duration: "14 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
  },
  {
    name: "Polygene Webapp",
    services: "Development",
    duration: "8 weeks",
    year: "2025",
    preview: "/src/assets/images/Placeholder.png",
  },
  {
    name: "Daisy’s Landing Page",
    services: "Design & Development",
    duration: "10 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
  },
  {
    name: "Count Dane Website",
    services: "Design & Development",
    duration: "14 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
  },
  {
    name: "Johnny Website",
    services: "Design & Development",
    duration: "12 weeks",
    year: "2024",
    preview: "/src/assets/images/Placeholder.png",
  },
];

const Projects = () => {
  return (
    <section className="w-full h-screen text-60-title">
      <div className="relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h opacity-45">
        <div className="text-16-body flex justify-between w-[30%] text-14-body">
          <SplitLineText text={"Project"} />
          <SplitLineText text={"Service"} />
        </div>

        <div className="text-16-body flex justify-between w-[30%] text-14-body">
          <SplitLineText text={"Duration"} />
          <SplitLineText text={"Year"} />
        </div>
      </div>

      <div>
        {[...listItems, ...listItems].map(
          ({ name, services, year, duration, preview }, i) => (
            <ProjectsList
              key={i}
              name={name}
              services={services}
              year={year}
              duration={duration}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
