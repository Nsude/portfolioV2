import React, { useRef } from "react";
import gsap from "gsap";
import ButtonHighlight from "./ButtonHighlight";

const CustomButton = ({ text, icon }) => {
  const textConRef = useRef();

  const animteText = (textIn) => {
    let con = textConRef.current;

    gsap.to(con, {
      yPercent: textIn ? -120 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <ButtonHighlight
      styles={"px-[22px] py-[8px] rounded-3xl"}
      mouseEnterFunc={() => animteText(true)}
      mouseLeaveFunc={() => animteText(false)}
    >
      <div className="overflow-hidden flex gap-x-[6px] items-center relative">
        {/* Icon */}
        {
          icon ? (
          <>
            <div className="h-[13px] w-[13px] absolute">
              {icon}
            </div>
            <div className="h-[13px] w-[13px]" />
          </>
          ) : null
        }

        {/* Text */}
        <div ref={textConRef} className="w-fit h-fit relative flex flex-col">
          <span className="relative z-[1] pointer-events-none">
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
