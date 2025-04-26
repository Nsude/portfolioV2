import React from 'react'
import Logo from '../../assets/Logo';
import CopyIcon from '../../assets/icons/CopyIcon';
import CustomButton from '../buttons/customButton';
import Magnetic from '../global/Magnetic';
import Hamburger from './Hamburger';
import Menu from './Menu';
import { useNavbarContext } from '../contexts/NavbarContext';

const Navbar = () => {
  const {navLinks} = useNavbarContext();
  return (
    <>
      <nav className='flex flex-row justify-between items-center px-mobile lg:px-desktop-h py-[22px]'>
        <div className='flex justify-between lg:w-[50%] 2xl:w-[40%]'>
          <div className='cursor-pointer '>
            <Magnetic>
              <Logo />
            </Magnetic>
          </div>

          <div className='hidden lg:flex gap-x-[12px] items-center'>
            {
              navLinks.map((item, i) => (
                <CustomButton key={i} text={item} />
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