import React, { useEffect, useRef, useState } from 'react'
import { useNavbarContext } from '../contexts/NavbarContext';
import { Link } from 'react-router-dom';
import CopyIcon from '../../assets/icons/CopyIcon';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useDevice from '../../components/hooks/useDevice';
import CustomButton from '../../components/buttons/CustomButton'
import { myEase1, myEase2 } from '../utility/contansts';
import SlideIn from '../global/SlideIn';
import observeElement from '../utility/customObserver';

const Footer = () => {
  const {socials, copyEmail, emailCopied} = useNavbarContext();
  const copyBoxRef = useRef();
  const containerRef = useRef();
  const copyButtonRef = useRef();
  const [trackCursor, setTrackCursor] = useState(false);
  const {width: deviceWidth} = useDevice();
  let revertInstance = useRef(null);
  const bordersRef = useRef([]);

  useEffect(() => {
    const copyButton = copyButtonRef.current;
    const borders = bordersRef.current;
    
    if (!(borders && copyButton)) return;
    console.log(borders)
    gsap.set(borders, {clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)"});

    const animateBorders = () => {
      gsap.to(borders, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: myEase2,
        stagger: .1
      })
    }

    observeElement(copyButton, animateBorders);

  }, [])

  const moveHandler = (e) => {
    const copyBox = copyBoxRef.current;
    const button = copyButtonRef.current;

    // prevent revert logic from clashing with animate logic
    if (revertInstance.current) {
      gsap.set(copyBox, {clearProps: 'all'});
    }

    const boxX = gsap.quickTo(copyBox, "left", {duration: .4, ease: "power3.out"});
    const boxY = gsap.quickTo(copyBox, "top", {duration: .4, ease: "power3.out"});

    const rect = button.getBoundingClientRect();
    const {clientX, clientY} = e;

    let relX = clientX - rect.left;
    let relY = clientY - rect.top;

    boxX(relX);
    boxY(relY);
  }


  useGSAP(() => {
    const copyBox = copyBoxRef.current;
    const button = copyButtonRef.current;
    if (deviceWidth < 1023) return;

    if (trackCursor) {
      revertInstance.current = null;
      button.addEventListener("mousemove", moveHandler);
    } else {
      button.removeEventListener("mousemove", moveHandler);
      // make sure the revert isn't triggered over a previous revert
      if (revertInstance.current) return;
      revertInstance.current = gsap.to(copyBox, {left: "25%", top: 0, duration: .8, delay: .8, ease: myEase1});
    }

  }, {scope: containerRef, dependencies: [trackCursor]})

  const handleClick = () => {
    if (emailCopied) return;
    copyEmail();
  }

  const openEmail = () => {
    window.location.href =
      "mailto:meshachnsd@gmail.com?subject=Collaboration%20Proposal";
  }

  return (
    <footer ref={containerRef} className=' overflow-hidden h-full lg:h-[50vh] w-full px-mobile lg:px-desktop-h flex flex-col justify-between pb-[30px] lg:pb-[50px]' >
      <div className='flex flex-col lg:flex-row justify-between gap-y-[60px] lg:gap-y-[unset] mb-[60px] lg:mb-[unset]'>
      {/* "LETS BUILD" ===TEXT=== */}
        <div className='text-45-title lg:text-60-title flex flex-wrap items-center gap-x-[10px] w-[78%] md:w-[50%] xl:w-[40%] 2xl:w-[30%]'>
          <SlideIn>
            <span> Let's Build </span>
          </SlideIn>

          <SlideIn>
            <span className='w-[90px] h-[50px] hidden overflow-hidden lg:inline-block rounded-4xl'> 
              <img 
                className='w-full h-full object-cover'
                src="/src/assets/images/profile-image.webp" 
                alt="small-headshot" />
            </span>
          </SlideIn>

          <SlideIn delay={.10}>
            <div className='flex items-center gap-x-[10px] lg:inline-block'>
              <span className='w-[90px] h-[50px] overflow-hidden inline-block lg:hidden rounded-4xl'> 
                <img 
                  className='w-full h-full object-cover'
                  src="/src/assets/images/profile-image.webp" 
                  alt="small-headshot" />
              </span>
              <span> Something </span>
            </div>
          </SlideIn>

          <SlideIn delay={.10}>
            <span> Unreal </span>
          </SlideIn>
        </div>

        {/* MOBILE COPY EMAIL */}
        <div className='inline-block lg:hidden'>
          <CustomButton 
            icon={<CopyIcon />}
            text={'meshachnsd@gmail.com'}
            full={true}
            handleClick={openEmail}
          /> 
        </div>

        {/* SOCIAL LINKS */}
        <div className='basis-[30%]' >
          <div className='flex justify-between mb-[35px] text-14-body opacity-40'>
            <SlideIn>
              <span>Socials</span>
            </SlideIn>
            <SlideIn>
              <span>/04</span>
            </SlideIn>
          </div>
          <div className='flex justify-between text-16-body'>
            {
              socials.map((item, i) => (
                <SlideIn key={i} delay={.05 * i}>
                  <Link key={i} to={item.link} target='_blank'>{item.title}</Link>
                </SlideIn>
              ))
            }
          </div>
        </div>
      </div>

      {/* MOBILE BORDER-LINE */}
      <span className='w-full h-[1px] top-0 left-0 bg-myBlack opacity-25 block mb-[30px] lg:hidden' />


      {/* DESKTOP COPY EMAIL */}
      <button 
        ref={copyButtonRef} 
        onClick={handleClick}
        onMouseEnter={(e) => {setTrackCursor(true); moveHandler(e)}} 
        onMouseLeave={() => setTrackCursor(false)} 
        className={`relative w-full h-[90px] justify-center transition-opacity duration-[400ms] ${emailCopied ? "opacity-40" : ""} hidden lg:flex`}>

        <span ref={(el) => bordersRef.current[0] = el} className='absolute w-full h-[1px] top-0 left-0 bg-myBlack opacity-40' />

        <span className='flex items-center gap-x-[5px] text-25-body'>
          <span className='pt-1'> <CopyIcon size={20} /> </span>
          <span>meshachnsd@gmail.com</span>
        </span>

        <span ref={(el) => bordersRef.current[1] = el} className='absolute w-full h-[1px] bottom-0 left-0 bg-myBlack opacity-40' />

        <div ref={copyBoxRef} 
          className='h-[70px] w-[70px] bg-myWhite border-1 border-myGray rounded-[70px] flex justify-center items-center absolute top-0 translate-[-50%] left-[25%] pointer-events-none'>
          Copy
        </div>
      </button>

      {/* COPYRIGHTS STUFF */}
      <div className='w-full flex justify-between'>
        <SlideIn>
          <span>{new Date().getFullYear()}</span>
        </SlideIn>
        <SlideIn>
          <span>All Rights Reserved &copy;</span>
        </SlideIn>
      </div>

    </footer>
  )
}

export default Footer;