import { useGSAP } from "@gsap/react";
import React, { useRef} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Marquee = ({ children }) => {
  const containerRef = useRef();
  const marqueeRef = useRef();
  const velocitySliderRef = useRef();

  useGSAP(() => {
      if (window.matchMedia("prefers-reduced-motion: reduce").matches) return;
      const con = containerRef.current;
      const marquee = marqueeRef.current;
      let currentDirection = 1;
      const velocitySlider = velocitySliderRef.current;
      let animationInstance = null;

      if (!(marquee && con && velocitySlider)) return;

      const createAnimation = (direction) => {
        if (animationInstance) {
          animationInstance.kill();
        }

        const currentPosition = gsap.getProperty(marquee, "xPercent");
        let endPosition = direction > 0 ? currentPosition - 33.33 : currentPosition + 33.33;
        
        animationInstance = gsap.fromTo(marquee, 
          {xPercent: currentPosition},
          {
          xPercent: endPosition,
          duration: 18,
          ease: "none",
          repeat: -1
        })

        currentDirection = direction;

        return animationInstance;
      }

      createAnimation(1);

      // direction control
      ScrollTrigger.create({
        trigger: con, 
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.direction !== currentDirection) {
            createAnimation(self.direction);
          }
        }
      })

      // velocity control
      gsap.to(velocitySlider, {
        x: "-=150px",
        scrollTrigger: {
          trigger: con,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      })
      

    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="overflow-hidden flex justify-center pointer-events-none">
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