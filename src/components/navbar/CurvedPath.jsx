import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavbarContext } from "../contexts/NavbarContext";
import { CustomEase } from "gsap/all";

const CurvedPath = () => {
  const {menuOpen} = useNavbarContext();
  const pathRef = useRef();
  const svgConRef = useRef();

  let initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight/2} 100 0`;
  let targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`;


  useGSAP(() => {
    const path = pathRef.current;

    if (!path) return;
    gsap.killTweensOf(path);

    if (menuOpen) {
      gsap.to(path, { attr: {d: targetPath}, duration: .8, ease: CustomEase.create("custom", "0.76, 0, 0.24, 1")})
    } else {
      gsap.to(path, { attr: {d: initialPath}, duration: .8, ease: CustomEase.create("custom", "0.76, 0, 0.24, 1")})
    }

  }, {scope: svgConRef.current, dependencies: [menuOpen]})

  return (
    <svg
      ref={svgConRef}
      className="absolute top-0 -left-[99px] h-full w-[100px] z-40"
      viewBox={`0 0 100 ${window.innerHeight}`}
      preserveAspectRatio="none"
    >
      <path ref={pathRef} d={initialPath} fill="#000" />
    </svg>
  );
};

export default CurvedPath;
