import { useGSAP } from "@gsap/react";
import React, { Children, useRef } from "react";
import gsap from "gsap";

const ScrollOpacity = ({ children, start = 60 }) => {
  const containerRef = useRef();

  useGSAP(
    () => {
      const con = containerRef.current;
      if (!con) return;

      gsap.killTweensOf(con);
      gsap.timeline({
        scrollTrigger: {
          trigger: con,
          start: `top ${start}%`,
          end: "top 15%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress; // returns a value between 0 - 1
            let difference = 1 - 0.25;
            let opacity;

            // first half: < 0.5
            if (progress < 0.5) {
              opacity = 0.25 + (progress * 2 * difference); // map 0.5 to 1: 50% here is 100%
            } else {
              opacity = 1 - ((progress - 0.5) * 2 * difference); // 0.5 to 0: 50% here is 0%
            }

            gsap.to(con, {opacity, duration: .4});
          }
        }
      })
      
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="opacity-25">
      {children}
    </div>
  );
};

export default ScrollOpacity;
