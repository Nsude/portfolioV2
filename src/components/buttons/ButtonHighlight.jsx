import React, { useRef } from "react";
import gsap from "gsap";

const ButtonHighlight = ({
  children,
  styles,
  handleClick = () => null,
  mouseEnterFunc = () => null,
  mouseLeaveFunc = () => null,
  disabled = false,
  allowEvents = false
}) => {
  const btnRef = useRef();
  const highlightRef = useRef();

  const getParams = (e) => {
    let rect = btnRef.current.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;
    let xPos = (mx / rect.width) * 100;
    let yPos = (my / rect.height) * 100;

    return { highlight: highlightRef.current, xPos, yPos };
  };

  const handleMouseEnter = (e) => {
    // prevent on mobile
    // coarse = touch
    // fine = cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { highlight, xPos, yPos } = getParams(e);
    mouseEnterFunc();

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

  const handleMouseMove = (e) => {
    moveSpan(e);
  };

  const handleMouseLeave = (e) => {
    const { highlight, xPos, yPos } = getParams(e);
    mouseLeaveFunc();

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

  const nativeHandleClick = () => {
    if (disabled) return;
    handleClick();
  }

  return (
    <button
      ref={btnRef}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      onClick={nativeHandleClick}
      className={`relative overflow-hidden ${styles} border-1 border-myGray rounded-3xl flex justify-center items-center`}
      style={{pointerEvents: disabled ? "none" : "all", opacity: disabled ? 0.4 : 1}}
    >
      <span
        ref={highlightRef}
        className="absolute left-0 top-0 h-full w-full bg-myAccent z-[0] opacity-0 pointer-events-none"
      />
      {/* Button Content */}
      <div className="h-fit w-fit relative z-1" style={{pointerEvents: allowEvents ? "all" : "none"}}>
        {children}
      </div>
    </button>
  );
};

export default ButtonHighlight;
