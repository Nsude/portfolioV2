import React, { useRef } from "react";
import gsap from "gsap";

const Magnetic = ({ children }) => {
  const containerRef = useRef();

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const con = containerRef.current;
    const rect = con.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    let damp = 0.6;

    gsap.to(con, {
      x: x * damp, // dampen effect
      y: y * damp,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      x: 0,
      y: 0,
      ease: "elastic.out(1.5, 0.3)", // bounce back
      duration: 1.2,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default Magnetic;
