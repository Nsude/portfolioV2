import React, { useRef } from "react";
import Checkmark from "../../assets/icons/Checkmark";
import { useNavbarContext } from "../contexts/NavbarContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import ToastShape from "../../assets/icons/ToastShape";
import { myEase1 } from "../utility/contansts";

const Notification = () => {
  const {emailCopied} = useNavbarContext();
  const containerRef = useRef();
  const shapeRef = useRef();

  useGSAP(() => {
    const con = containerRef.current;
    const shape = shapeRef.current
    
    gsap.killTweensOf(con, shape);
    const ease = myEase1;

    if (emailCopied) {
      gsap.to(con, { transform: "translateY(0)", duration: .8, ease });

      gsap.to(shape, { transform: "translateY(0)", duration: .8, ease });
    } else {
      gsap.to(con, { transform: "translateY(150%)", duration: .8, ease })
      gsap.to(shape, { transform: "translateY(120%)", duration: .8, ease });
    }

  }, {scope: containerRef.current, dependencies: [emailCopied]})

  return (
    <div ref={containerRef} className="fixed z-[5] left-[35px] bottom-[35px] hidden lg:flex items-center gap-x-[10px] bg-myBlack rounded-[10px] w-[275px] h-[80px] px-[12px] py-[15px] translate-y-[150%] border-2 border-myBlack shadow-2xl">
      <div className="w-[50px] aspect-square bg-myAccent flex justify-center items-center rounded-[6px]">
        <Checkmark color={"#000"} />
      </div>
      <div className=" text-myWhite">
        <span className="opacity-40 text-14-body">Notification</span>
        <h3 className="text-25-body">eMail Copied</h3>
      </div>

      <div ref={shapeRef} className="absolute right-[-40px] top-[-54px] translate-y-[120%]">
        <ToastShape />
      </div>
    </div>
  );
};

export default Notification;
