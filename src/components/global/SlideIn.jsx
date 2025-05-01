import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import observeElement from "../utility/customObserver";

const SlideIn = ({ children, delay = 0 }) => {
  const animBoxesRef = useRef([]);
  const containerRef = useRef();

  useGSAP(
    () => {
      const boxes = animBoxesRef.current;
      const con = containerRef.current;

      if (!boxes || !con) return;
      gsap.killTweensOf(boxes);

      const animateBoxes = () => {
        gsap.to(boxes, {
          transform: "translateY(0%)",
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.05,
          delay,
        });
      };

      // animate boxes when they enter the screen
      observeElement(con, animateBoxes);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child, i) => (
        <div key={i} className={`overflow-hidden py-[3px]`}>
          <div
            ref={(el) => (animBoxesRef.current[i] = el)}
            className="translate-y-[110%]"
          >
            {" "}
            {child}{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideIn;
