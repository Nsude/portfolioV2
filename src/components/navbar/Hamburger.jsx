import { useRef, useState } from "react";
import ButtonHighlight from "../buttons/ButtonHighlight";
import Magnetic from "../global/Magnetic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavbarContext } from "../contexts/NavbarContext";

const Hamburger = () => {
  const { menuOpen, setMenuOpen } = useNavbarContext();
  const firstBarRef = useRef();
  const secBarRef = useRef();
  const containerRef = useRef();

  useGSAP(
    () => {
      const bar1 = firstBarRef.current;
      const bar2 = secBarRef.current;

      if (!bar1 || !bar2) return null;
      gsap.killTweensOf([bar1, bar2]);

      const tl = gsap.timeline();

      if (menuOpen) {
        // merge
        tl.to(bar1, { y: 3, duration: 0.2, ease: "power2.out" });
        tl.to(bar2, { y: -3, duration: 0.2, ease: "power2.out" }, "<");

        // rotate
        tl.to(bar1, { rotate: -45, duration: 0.2, ease: "power2.out" });
        tl.to(bar2, { rotate: 45, duration: 0.2, ease: "power2.out" }, "<");
      } else {
        // rotate
        tl.to(bar1, { rotate: 0, duration: 0.2, ease: "power2.out" });
        tl.to(bar2, { rotate: 0, duration: 0.2, ease: "power2.out" }, "<");

        // unmerge
        tl.to(bar1, { y: 0, duration: 0.2, ease: "power2.out" });
        tl.to(bar2, { y: 0, duration: 0.2, ease: "power2.out" }, "<");
      }
    },
    { scope: containerRef.current, dependencies: [menuOpen] }
  );

  return (
    <div
    >
      <Magnetic>
        <ButtonHighlight
          handleClick={() => setMenuOpen(!menuOpen)}
          styles={`${
            menuOpen
              ? "bg-myAccent"
              : "transition-[background] duration-400 delay-300 bg-myBlack"
          }`}
        >
          <div
            ref={containerRef}
            className="flex flex-col items-center justify-center gap-y-[6px] h-[45px] aspect-square "
          >
            <span
              ref={firstBarRef}
              className="w-[24px] h-[1px] bg-myBlack lg:bg-myWhite origin-center"
            ></span>
            <span
              ref={secBarRef}
              className="w-[24px] h-[1px] bg-myBlack lg:bg-myWhite origin-center"
            ></span>
          </div>
        </ButtonHighlight>
      </Magnetic>
    </div>
  );
};

export default Hamburger;
