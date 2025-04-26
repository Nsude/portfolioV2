import React, { useRef } from "react";
import { useNavbarContext } from "../contexts/NavbarContext";
import { Link } from "react-router-dom";
import CustomButton from "../buttons/customButton";
import EmailIcon from "../../assets/icons/EmailIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/all";
import CurvedPath from "./CurvedPath";
import { useLenis } from "lenis/react";


const Menu = () => {
  const { navLinks, socials, menuOpen, setMenuOpen, sectionRefs} = useNavbarContext();
  const menuContainerRef = useRef();
  const navLinksRef = useRef([]);
  const lenis = useLenis();

  useGSAP(
    () => {
      let con = menuContainerRef.current;
      let links = navLinksRef.current;

      if (!con || links.length < 1) return;
      gsap.killTweensOf([con, ...links]);
      const tl = gsap.timeline();
      let ease = CustomEase.create("custom", "0.76, 0, 0.24, 1");

      if (menuOpen) {
        tl.to(con, { transform: "translateX(0)", duration: 0.8, ease});

        tl.fromTo(links, {x: 80}, {x: 0, duration: .8, ease, stagger: .05}, "<")
        
      } else {
        tl.to(con, { transform: "translateX(130%)", duration: 0.8, ease });

        tl.to(links, {x: 80, duration: .8, ease, stagger: .05}, "<")
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
      easing: (t) => 1 - Math.pow(1 - t, 3) 
    })

    setMenuOpen(false);
  }

  return (
    <nav
      ref={menuContainerRef}
      className="fixed top-0 right-0 w-full h-full max-w-[500px] bg-myBlack pt-[160px] px-mobile translate-x-[130%] lg:hidden"
    >
      <div className="mb-[90px]">
        <span className="text-14-body text-myWhite opacity-40">Navigation</span>
        <div className="flex flex-col gap-y-[25px] mt-[40px] text-45-title text-myWhite">
          {navLinks.map((item, i) => (
            <button ref={(el) => navLinksRef.current[i] = el} key={i} className="text-left" onClick={() => navigateToSection(item)}>
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
  );
};

export default Menu;
