import React, { useRef } from "react";
import "./buttons.css";
import gsap from "gsap";

const NoIconBtn = ({ text }) => {
  const noIconBtnRef = useRef();
  const highlightRef = useRef();
  const textConRef = useRef();

  const getParams = (e) => {
    let rect = noIconBtnRef.current.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;
    let xPos = (mx / rect.width) * 100;
    let yPos = (my / rect.height) * 100;

    return { highlight: highlightRef.current, xPos, yPos };
  };

  const handleMouseEnter = (e) => {
    const { highlight, xPos, yPos } = getParams(e);
    animteText(true);

    gsap.killTweensOf(highlight);

    gsap
      .set(highlight, {
        opacity: 1,
        clipPath: `circle(20% at ${xPos}% ${yPos}%)`,
      })
      .then(() => {
        moveSpan(e);
      });
  };

  const animteText = (textIn) => {
    let con = textConRef.current;

    gsap.to(con, {
      yPercent: textIn ? -120 : 0,
      duration: 0.4,
      ease: "expo.inOut",
    });
  };

  const handleMouseMove = (e) => {
    moveSpan(e);
  };

  const handleMouseLeave = (e) => {
    const { highlight, xPos, yPos } = getParams(e);
    animteText(false);

    gsap
      .to(highlight, {
        clipPath: `circle(0% at ${xPos}% ${yPos}%)`,
        duration: 0.25,
      })
      .then(() => {
        gsap.set(highlight, { opacity: 0 });
      });
  };

  const moveSpan = (e) => {
    const { highlight, xPos, yPos } = getParams(e);

    gsap.to(highlight, {
      clipPath: `circle(105% at ${xPos}% ${yPos}%)`,
      duration: 0.4,
    });
  };

  return (
    <button
      ref={noIconBtnRef}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="px-[22px] py-[10px] text-myBlack relative overflow-hidden rounded-[50px]"
    >
      <span className="absolute left-0 top-0 h-full w-full z-[-1] bg-myGray pointer-events-none" />
      <span
        ref={highlightRef}
        className="absolute left-0 top-0 h-full w-full bg-myAccent z-[0] opacity-0 pointer-events-none"
      />
      <div className="overflow-hidden">
        <div ref={textConRef} className="w-fit h-fit relative flex flex-col">
          <span className="relative z-[1] pointer-events-none">
            {text || "No-icon button"}
          </span>
          <span className="absolute z-[1] translate-y-[120%] pointer-events-none">
            {text || "No-icon button"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default NoIconBtn;
