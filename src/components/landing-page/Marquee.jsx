import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

const Marquee = ({ children }) => {
  const containerRef = useRef();
  const marqueeRef = useRef();
  const velocitySliderRef = useRef();
  let direction = -1;
  let xPercent = 0;

  useGSAP(
    () => {
      if (window.matchMedia("prefers-reduced-motion: reduce").matches) return;
      const con = containerRef.current;

      gsap.to(velocitySliderRef.current, {
        x: "-300px",
        scrollTrigger: {
          trigger: con,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.25,
          onUpdate: (self) => (direction = self.direction * -1),
        },
      });

      requestAnimationFrame(animation);
    },
    { scope: containerRef }
  );

  const animation = () => {
    if (xPercent <= -33.33 || (direction > 0 && xPercent >= 33.33)) {
      xPercent = 0;
    }

    gsap.set(marqueeRef.current, { xPercent });
    requestAnimationFrame(animation);

    xPercent += 0.009 * direction;
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden flex justify-center pointer-events-none"
    >
      <div ref={velocitySliderRef}>
        <div ref={marqueeRef} className="flex w-max">
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
