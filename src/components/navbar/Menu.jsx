import React, { useEffect, useRef } from "react";
import { useNavbarContext } from "../contexts/NavbarContext";
import { Link } from "react-router-dom";
import CustomButton from "../buttons/customButton";
import EmailIcon from "../../assets/icons/EmailIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/all";
import CurvedPath from "./CurvedPath";
import { useLenis } from "lenis/react";
import useDevice from "../hooks/useDevice";

const Menu = () => {
  const {
    navLinks,
    socials,
    menuOpen,
    setMenuOpen,
    sectionRefs,
    navbarHidden,
  } = useNavbarContext();
  const menuContainerRef = useRef();
  const navLinksRef = useRef([]);
  const lenis = useLenis();
  const deviceWidth = useDevice();
  const blurOverlayRef = useRef();

  useEffect(() => {
    if (deviceWidth < 1024) return;
    
    const blur = blurOverlayRef.current;
    gsap.killTweensOf(blur);

    if (menuOpen) {
      gsap.to(blur, {opacity: 1, duration: .6});
    } else {
      gsap.to(blur, {opacity: 0, duration: .8})
    }
  
  }, [menuOpen])

  // close desktop menu when navbar is visible
  useEffect(() => {
    if (window.innerWidth > 1023 && !navbarHidden) {
      setMenuOpen(false);
    }
  }, [navbarHidden, deviceWidth])

  useGSAP(
    () => {
      let con = menuContainerRef.current;
      let links = navLinksRef.current;

      if (!con || links.length < 1) return;
      gsap.killTweensOf([con, ...links]);

      const tl = gsap.timeline();
      let ease = CustomEase.create("custom", "0.76, 0, 0.24, 1");

      if (menuOpen) {
        tl.to(con, { transform: "translateX(0)", duration: 0.8, ease });

        tl.fromTo(
          links,
          { x: 80 },
          { x: 0, duration: 0.9, ease, stagger: 0.05 },
          "<"
        );
      } else {
        tl.to(con, { transform: "translateX(130%)", duration: 0.8, ease });
        tl.to(links, { x: 80, duration: 0.8, ease, stagger: 0.05 }, "<");
      }
    },
    { scope: menuContainerRef.current, dependencies: [menuOpen] }
  );

  const openEmail = () => {
    window.location.href =
      "mailto:meshachnsd@gmail.com?subject=Collaboration%Proposal";
  };

  const navigateToSection = (sectionName) => {
    const activeSection = sectionRefs[sectionName.toLowerCase()];
    let section = activeSection.current;
    if (!section) throw new Error("Section is undefined");

    lenis.scrollTo(section, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    setMenuOpen(false);
  };

  return (
    <>
    <div className="fixed w-full h-full left-0 right-0 top-0 overflow-hidden lg:w-[450px] lg:h-[55vh] lg:min-h-[560px]  lg:left-[50%] lg:right-[unset] lg:top-[unset] lg:bottom-[102px] lg:translate-x-[-50%] z-[3]">
      <nav
        ref={menuContainerRef}
        className="fixed top-0 right-0 w-full h-full max-w-[500px] bg-myBlack pt-[160px] lg:py-[45px] px-mobile translate-x-[130%] lg:right-[unset] lg:left-0 lg:bottom-0 lg:rounded-[15px]"
      >
        <div className="mb-[90px] lg:mb-[60px]">
          <span className="text-14-body text-myWhite opacity-40">
            Navigation
          </span>
          <div className="flex flex-col gap-y-[25px] mt-[40px] text-45-title text-myWhite">
            {navLinks.map((item, i) => (
              <button
                ref={(el) => (navLinksRef.current[i] = el)}
                key={i}
                className="text-left"
                onClick={() => navigateToSection(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-[40px]">
          <span className="text-14-body text-myWhite opacity-40">Socials</span>
          <div className="mt-[25px] text-16-body text-myWhite flex gap-x-[20px]">
            {socials.map((item, i) => (
              <Link key={i} to={item.link} target="_blank">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <CustomButton
          text={"meshachnsd@gmail.com"}
          bg={true}
          full={true}
          icon={<EmailIcon />}
          handleClick={() => openEmail()}
        />

        <CurvedPath />
      </nav>
    </div>
    <div ref={blurOverlayRef} className="fixed left-0 top-0 w-full h-full z-2 bg-myWhite/20 backdrop-blur-[6px] opacity-0" />
    </>
  );
};

export default Menu;