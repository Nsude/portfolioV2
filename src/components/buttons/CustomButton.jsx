import React, { useRef } from "react";
import gsap from "gsap";
import ButtonHighlight from "./ButtonHighlight";
import { myEase1 } from "../utility/contansts";

const CustomButton = ({
  text,
  icon,
  bg,
  full,
  activeIcon = null,
  handleClick = () => null,
  disabled = false,
}) => {
  const textConRef = useRef();
  const iconsRef = useRef();

  const animteText = (textIn) => {
    let con = textConRef.current;

    gsap.to(con, {
      yPercent: textIn ? -120 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const ease = myEase1;
  const nativeHandleClick = () => {
    handleClick();

    // animate icon
    if (!activeIcon) return;

    const icons = iconsRef.current;
    gsap.killTweensOf(icons);
    gsap.to(icons, { yPercent: -105, duration: 0.6, ease });
  };

  const handleMouseleave = () => {
    animteText(false);

    // animate icon
    if (!activeIcon) return;

    const icons = iconsRef.current;
    gsap.killTweensOf(icons);
    gsap.to(icons, { yPercent: 0, duration: 0.6, ease });
  };

  return (
    <ButtonHighlight
      styles={`px-[22px] py-[8px] ${bg ? "bg-myGray" : ""} ${
        full ? "w-full py-[20px] rounded-4xl" : ""
      }`}
      mouseEnterFunc={() => animteText(true)}
      mouseLeaveFunc={handleMouseleave}
      handleClick={nativeHandleClick}
      disabled={disabled}
    >
      <div className="overflow-hidden flex gap-x-[6px] items-center relative text-16-body">
        {/* Icon */}
        {icon ? (
          <>
            <div ref={iconsRef} className="absolute top-1">
              <div className="h-[13px] w-[13px]">{icon}</div>
              <div className="h-[13px] w-[13px] translate-y-[110%]">
                {activeIcon}
              </div>
              {/* absolute so it doesn't scroll and the second acts as a placeholder */}
            </div>
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
