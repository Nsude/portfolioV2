import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { myEase2 } from "../utility/contansts";
import observeElement from "../utility/customObserver";
import SplitLineText from "../global/SplitLineText"

const ProjectsList = ({
  name = "Client Website",
  services = "Design & Development",
  duration = "14 weeks",
  year = "2025",
  handleMouseEnter = () => null
}) => {
  const containerRef = useRef();
  const overlayRef = useRef();
  const bordersRef = useRef([]);

  let listHoverDuration = 0.25;
  let ease = "power2.out";

  useGSAP(() => {
    const con = containerRef.current;
    const overlay = overlayRef.current;
    const borders = bordersRef.current;
    
    if (!overlay || borders.length === 0 || !con) return;
    // hide overlay
    gsap.set(overlay, {clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"});
    // hide borders
    gsap.set(borders, {clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)"});

    const animateElems = () => {
      // borders
      gsap.to(borders, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: myEase2
      })

    }

    observeElement(con, animateElems)


  }, {scope: containerRef})

  const detectEntryPoint = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const midPoint = rect.top + rect.height / 2;

    let direction;

    direction = mouseY < midPoint ? "top" : "bottom";
    
    return direction;
  };

  const handleLocalMouseEnter = (e) => {
    handleMouseEnter();

    const direction = detectEntryPoint(e);
    const overlay = overlayRef.current;

    if (!overlay) return;
    gsap.killTweensOf(overlay);
    
    if (direction === "top") {
      // hide to top
      gsap.set(overlay, {clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"});

      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: listHoverDuration,
        ease
      })
    } else {
      // Start fully hidden at bottom (rectangle collapsed to bottom edge)
      gsap.set(overlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
      });

      // Animate to fully revealed rectangle
      gsap.to(overlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: listHoverDuration,
        ease
      });
    }
  }

  const handleMouseLeave = (e) => {
    const direction = detectEntryPoint(e);
    const overlay = overlayRef.current;

    if (!overlay) return;

    if (direction === "bottom") {
      gsap.to(overlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 100% 100%)",
        duration: listHoverDuration,
        ease
      })
    } else {
      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: listHoverDuration,
        ease
      })
    }
  }


  return (
    <button 
      ref={containerRef} 
      onMouseEnter={(e) => handleLocalMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h p-list-con text-16-body">

      <span ref={overlayRef} className="absolute z-[-1] left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] top-0 h-full bg-myBlack" />

      <span ref={(el) => bordersRef.current[0] = el} className="absolute left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] top-0 h-[1px] bg-myBlack p-list-first-border" />

      <div className="basis-[50%] lg:basis-[20%] text-left">
        <SplitLineText text={name} textstyles={"p-list-start-text"} />
      </div>


      <div className="basis-[50%] hidden lg:flex justify-between">
        <SplitLineText text={services} />
        <SplitLineText text={duration} />
      </div>

      <div className="basis-[50%] lg:basis-[20%] text-right">
        <SplitLineText text={year} textstyles={"p-list-end-text"} />
      </div>

      <span ref={(el) => bordersRef.current[1] = el} className="absolute left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] bottom-0 h-[1px] bg-myBlack" />

    </button>
  );
};

export default ProjectsList;
