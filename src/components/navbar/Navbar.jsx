import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "../../assets/Logo";
import CopyIcon from "../../assets/icons/CopyIcon";
import CopiedIcon from "../../assets/icons/CopiedIcon";
import CustomButton from "../buttons/CustomButton";
import Magnetic from "../global/Magnetic";
import Hamburger from "./Hamburger";
import Menu from "./Menu";
import { useNavbarContext } from "../contexts/NavbarContext";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import useDevice from "../hooks/useDevice";
import Notification from "../global/Notification";
import { myEase1 } from "../utility/contansts";

const Navbar = () => {
  const { navLinks, sectionRefs, setNavbarHidden, copyEmail, setNavlinksLeft , emailCopied} =
    useNavbarContext();
  const lenis = useLenis();
  const containerRef = useRef();
  const hamburgerRef = useRef();
  const { width: deviceWidth } = useDevice();
  const isDesktopRef = useRef(deviceWidth > 1023);
  const scrollHandlerRef = useRef();
  const navlinksRef = useRef();

  useGSAP(() => {
    const con = containerRef.current;
    const ham = hamburgerRef.current;

    let isHidden = false; // track navbar state
    let ease = myEase1;

    const showNavbar = () => {
      if (!isDesktopRef.current) return;
      gsap.to(con, { y: 0, duration: 0.8, ease });
      gsap.to(ham, { y: 80, xPercent: -50, duration: 0.8, ease });

      isHidden = false;
    };

    const hideNavbar = () => {
      if (!isDesktopRef.current) return;
      gsap.to(con, { y: -100, duration: 0.8, ease });
      gsap.to(ham, { y: 0, xPercent: -50, duration: 0.8, ease });

      isHidden = true;
    };

    const handleScroll = () => {
      if (!isDesktopRef.current) return;
      const scroll = window.scrollY;
      let trigger = 120;

      if (scroll > trigger && !isHidden) {
        hideNavbar();
      } else if (scroll <= trigger && isHidden) {
        showNavbar();
      }

      if (window.innerWidth > 1023) {
        setNavbarHidden(isHidden);
      }
    };

    // when a user resizes the window
    const handleResizeBehavior = () => {
      const isDesktopNow = deviceWidth > 1023;

      if (isDesktopRef.current === isDesktopNow) return;
      isDesktopRef.current = isDesktopNow;

      if (!isDesktopNow) {
        // clear gsap animation properties on mobile
        gsap.set(con, { clearProps: "all" });
        gsap.set(ham, { clearProps: "all", xPercent: 0 });
      } else {
        // set gsap base properties on desktop
        gsap.set(con, { y: 0 });
        gsap.set(ham, { y: 80, xPercent: -50 });
      }

      // remove event listener on mobile
      window.removeEventListener("scroll", scrollHandlerRef.current);

      // reinit event listener on desktop
      if (isDesktopNow.current) {
        window.addEventListener("scroll", scrollHandlerRef.current);
      }
    };

    handleResizeBehavior();
    scrollHandlerRef.current = handleScroll;

    // only init listener on desktop
    if (isDesktopRef.current) {
      window.addEventListener("scroll", scrollHandlerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", scrollHandlerRef.current);
    };
  }, [deviceWidth]);

  // scroll section into view
  const navigateToSection = (sectionName) => {
    const activeSection = sectionRefs[sectionName.toLowerCase()];
    let section = activeSection.current;
    if (!section) throw new Error("Section is undefined");

    lenis.scrollTo(section, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      offset: sectionName.toLowerCase() === "projects" ? -window.innerHeight/4 : 0
    });
  };

  // set navlinks left for layout alignment
  useLayoutEffect(() => {
    const links = navlinksRef.current;
    if (!links) return;

    const rect = links.getBoundingClientRect();
    setNavlinksLeft(rect.left);

  }, [deviceWidth]);

  return (
    <>
      <Notification />

      <div className="fixed left-[25px] z-[3] top-[22px] lg:left-[35px]">
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

          <div
            ref={navlinksRef}
            className="hidden lg:flex gap-x-[12px] items-center"
          >
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
          <CustomButton
            text={"Copy email"}
            activeIcon={<CopiedIcon />}
            icon={<CopyIcon />}
            handleClick={() => copyEmail()}
            disabled={emailCopied}
          />
        </div>
      </nav>

      <div
        ref={hamburgerRef}
        className="fixed top-[22px] right-[20px] z-[5] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[80px] lg:right-[unset] lg:top-[unset] bottom-[35px]"
      >
        <Hamburger />
      </div>

      {/* MENU */}
      <Menu />
    </>
  );
};

export default Navbar;
