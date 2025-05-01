import React, { useEffect, useRef } from "react";
import useDevice from "../hooks/useDevice";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { myEase1 } from "../utility/contansts";
import observeElement from "../utility/customObserver";

const SplitLineText = ({ text, textstyles }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { width: deviceWidth } = useDevice();

  useGSAP(
    () => {
      const textCon = textRef.current;
      const mainCon = containerRef.current;
      if (!textCon || !mainCon) return;

      // kill previous animations on rerender
      gsap.killTweensOf(textCon);

      observeElement(mainCon, () => {
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
      }, 0.05)
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
