import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Marquee = ({ children }) => {
  const containerRef = useRef();
  const marqueeRef = useRef();

  useGSAP(() => {
      if (window.matchMedia("prefers-reduced-motion: reduce").matches) return;
      const con = containerRef.current;
      const marquee = marqueeRef.current;
      let animationInstance = null;
      let currentDirection = 1;
      const baseDuration = 22;
      const minDuration = 3;

      if (!marquee) return;

      const createAnimation = (direction, velocity = 0) => {
        // to ensure seamless direction change from the last position
        const currentPosition = gsap.getProperty(marquee, "xPercent");

        // kill old animation
        if (animationInstance) {
          animationInstance.kill();
        }

        // (baseDuration - minduration) gives us by how much we can reduce baseduration
        // velocityFactor * () gives us how much we should remove based on the velocity
        let absVelocity = Math.abs(velocity);
        const velocityFactor = Math.min(absVelocity / 2000, 1); // normalize velocity
        const duration = baseDuration - velocityFactor * (baseDuration - minDuration);

        let endPosition = direction > 0 ? currentPosition - 33.33 : currentPosition + 33.33;

        animationInstance = gsap.fromTo(marquee, 
          { xPercent: currentPosition },
          { xPercent: endPosition,
          repeat: -1,
          duration,
          ease: "none",
          immediateRender: false
        });

        return animationInstance;
      };

      // init animation
      animationInstance = createAnimation(1);

      ScrollTrigger.create({
        trigger: con,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          let velocity = self.getVelocity();
          const newDirection = self.direction;

          // if there's a mismatch between the scroll direction and animation or the velocity is substantial
          // create a new animation (this kills the old animation as well)
          if (newDirection !== currentDirection || Math.abs(velocity) > 10) {
            createAnimation(newDirection, velocity);
          } 

          currentDirection = newDirection;
        },
      });

    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="overflow-hidden flex justify-center">
      <div ref={marqueeRef} className="flex w-max">
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;