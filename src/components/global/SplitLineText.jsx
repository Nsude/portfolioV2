import React, { useEffect, useRef } from "react";
import useDevice from "../hooks/useDevice";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { myEase1 } from "../utility/contansts";

const SplitLineText = ({ text, textstyles }) => {
  const containerRef = useRef();
  const textRef = useRef();

  useGSAP(
    () => {
      const textCon = textRef.current;
      const mainCon = containerRef.current;
      if (!textCon || !mainCon) return;

      // kill previous animations on rerender
      gsap.killTweensOf(textCon);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            SplitText.create(textCon, {
              type: "lines",
              autoSplit: true,
              onSplit: (self) => {
                // create masks
                self.lines.forEach((line) => {
                  const mask = document.createElement("div");
                  mask.style.overflow = "hidden";
                  line.parentNode?.insertBefore(mask, line);
                  mask.appendChild(line);
                });

                // animate lines
                gsap.from(self.lines, {
                  y: 20,
                  autoAlpha: 0,
                  stagger: {
                    amount: 0.25,
                  },
                  ease: myEase1,
                });
              },
            });

            observer.disconnect();
          });
        },
        { threshold: 0.05 }
      );

      // init observer
      observer.observe(mainCon);

      return () => {
        observer.unobserve(mainCon);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <p ref={textRef} className={textstyles}>
        {text}
      </p>
    </div>
  );
};

export default SplitLineText;
