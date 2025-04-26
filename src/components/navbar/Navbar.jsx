import React from 'react'
import Logo from '../../assets/Logo';
import CopyIcon from '../../assets/icons/CopyIcon';
import CustomButton from '../buttons/customButton';
import Magnetic from '../global/Magnetic';
import Hamburger from './Hamburger';
import Menu from './Menu';
import { useNavbarContext } from '../contexts/NavbarContext';
import { useLenis } from 'lenis/react';

const Navbar = () => {
  const {navLinks, sectionRefs, menuOpen} = useNavbarContext();
  const lenis = useLenis();

  const navigateToSection = (sectionName) => {
    const activeSection = sectionRefs[sectionName.toLowerCase()];
    let section = activeSection.current;
    if (!section) throw new Error("Section is undefined");

    lenis.scrollTo(section, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3) 
    })
  }

  return (
    <>
      <nav className='fixed left-0 w-full top-0 flex flex-row z-1 justify-between items-center px-mobile lg:px-desktop-h py-[22px]'>
        <div className='flex justify-between lg:w-[50%] 2xl:w-[40%]'>
          <Magnetic>
            <button onClick={() => navigateToSection("hero")}>
              <Logo />
            </button>
          </Magnetic>

          <div className='hidden lg:flex gap-x-[12px] items-center'>
            {
              navLinks.map((item, i) => (
                <CustomButton key={i} text={item} handleClick={() => navigateToSection(item)}/>
              ))
            }
          </div>
        </div>

        <div className='hidden lg:block'>
          <CustomButton text={"Copy email"} icon={<CopyIcon />} />
        </div>

        <Hamburger />
      </nav>

      {/* MENU */}
      <Menu />
    </>
  )
}

export default Navbar;