import React, { useRef } from "react";
import gsap from "gsap";
import ButtonHighlight from "./ButtonHighlight";

const CustomButton = ({ text, icon, bg, full, handleClick = () => null }) => {
  const textConRef = useRef();

  const animteText = (textIn) => {
    let con = textConRef.current;

    gsap.to(con, {
      yPercent: textIn ? -120 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <ButtonHighlight
      styles={`px-[22px] py-[8px] ${bg ? "bg-myGray" : ""} ${
        full ? "w-full py-[20px] rounded-4xl" : ""
      }`}
      mouseEnterFunc={() => animteText(true)}
      mouseLeaveFunc={() => animteText(false)}
      handleClick={() => handleClick()}
    >
      <div className="overflow-hidden flex gap-x-[6px] items-center relative text-16-body">
        {/* Icon */}
        {icon ? (
          <>
            <div className="h-[13px] w-[13px] absolute ">{icon}</div>
            <div className="h-[13px] w-[13px]" />
          </>
        ) : null}

        {/* Text */}
        <div ref={textConRef} className="w-fit h-fit relative flex flex-col">
          <span className={`pointer-events-none`}>
            {text || "No-icon button"}
          </span>
          <span className="absolute z-[1] translate-y-[120%] pointer-events-none">
            {text || "No-icon button"}
          </span>
        </div>
      </div>
    </ButtonHighlight>
  );
};

export default CustomButton;
