import React from 'react'
import { useNavbarContext } from '../contexts/NavbarContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const {socials} = useNavbarContext();

  return (
    <footer className='h-[50vh] w-full px-desktop-h flex flex-col justify-between pb-[50px]' >
      <div className='flex justify-between'>
        <div className='text-45-title text-60-title flex flex-wrap w-[78%] md:w-[50%] xl:w-[40%] 2xl:w-[30%]'>
          <span> Let's Build </span>
          <span className='w-[90px] h-[50px] bg-myBlack hidden lg:inline-block rounded-4xl ml-[10px]'>  </span>
          <div className='flex items-center gap-x-[10px] lg:inline-block'>
            <span className='w-[90px] h-[50px] bg-myBlack inline-block lg:hidden rounded-4xl'>  </span>
            <span> Something </span>
          </div>
          <span> Unreal </span>
        </div>

        <div className='basis-[30%]' >
          <div className='flex justify-between mb-[35px] text-14-body opacity-40'>
            <span>Socials</span>
            <span>/04</span>
          </div>
          <div className='flex justify-between text-16-body'>
            {
              socials.map((item, i) => (
                <Link key={i} to={item.link} target='_blank'>{item.title}</Link>
              ))
            }
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between'>
        <span>{new Date().getFullYear()}</span>
        <span>All Rights Reserved &copy;</span>
      </div>

    </footer>
  )
}

export default Footer;