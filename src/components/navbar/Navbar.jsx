import React, { useRef } from "react";
import Logo from "../../assets/Logo";
import CopyIcon from "../../assets/icons/CopyIcon";
import CustomButton from "../buttons/customButton";
import Magnetic from "../global/Magnetic";
import Hamburger from "./Hamburger";
import Menu from "./Menu";
import { useNavbarContext } from "../contexts/NavbarContext";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

const Navbar = () => {
  const { navLinks, sectionRefs, menuOpen } = useNavbarContext();
  const lenis = useLenis();
  const containerRef = useRef();
  const hamburgerRef = useRef();

  useGSAP(() => {
    const con = containerRef.current;
    const ham = hamburgerRef.current;

    let isHidden = false; // track navbar state
    let ease = CustomEase.create("custom", "0.76, 0, 0.24, 1");

    const showNavbar = () => {
      gsap.to(con, { y: 0, duration: 0.8, ease });
      gsap.to(ham, { y: 80, xPercent: -50, duration: 0.8, ease });
      isHidden = false;
    };

    const hideNavbar = () => {
      gsap.to(con, { y: -100, duration: 0.8, ease });
      gsap.to(ham, { y: 0, xPercent: -50, duration: 0.8, ease });
      isHidden = true;
    };

    const handleScroll = () => {
      const scroll = window.scrollY;
      let trigger = 120;

      if (scroll > trigger && !isHidden) {
        hideNavbar();
      } else if (scroll <= trigger && isHidden) {
        showNavbar();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToSection = (sectionName) => {
    const activeSection = sectionRefs[sectionName.toLowerCase()];
    let section = activeSection.current;
    if (!section) throw new Error("Section is undefined");

    lenis.scrollTo(section, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  return (
    <>
      <div className="fixed left-[25px] z-[2] top-[22px] lg:left-[35px]">
        <Magnetic>
          <button onClick={() => navigateToSection("hero")}>
            <Logo />
          </button>
        </Magnetic>
      </div>

      <nav
        ref={containerRef}
        className="fixed left-0 w-full top-0 flex flex-row z-1 justify-between items-center px-mobile lg:px-desktop-h py-[22px]"
      >
        <div className="flex justify-between lg:w-[50%] 2xl:w-[40%]">
          <div className="w-[24px] aspect-square pointer-events-none bg-transparent" />

          <div className="hidden lg:flex gap-x-[12px] items-center">
            {navLinks.map((item, i) => (
              <CustomButton
                key={i}
                text={item}
                handleClick={() => navigateToSection(item)}
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <CustomButton text={"Copy email"} icon={<CopyIcon />} />
        </div>
      </nav>

      <div
        ref={hamburgerRef}
        className="fixed top-[22px] right-[20px] z-2 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[80px] lg:right-[unset] lg:top-[unset] bottom-[35px] "
      >
        <Hamburger />
      </div>

      {/* MENU */}
      <Menu />
    </>
  );
};

export default Navbar;
