import React from "react";
import ProjectsList from "./ProjectsList";
import PreviewModal from "./PreviewModal";

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
      {[...listItems, ...listItems].map(({ name, services, year, duration, preview}, i) => (
        <ProjectsList 
          key={i}
          name={name} 
          services={services}
          year={year}
          duration={duration}
        />
      ))}
    </section>
  );
};

export default Projects;
