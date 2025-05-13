import React, { useEffect, useRef, useState } from 'react'
import { testimonials } from '../global/DummyData';
import TestimonialImageReveal from './TestimonialImageReveal';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import ButtonHighlight from '../buttons/ButtonHighlight'
import Magnetic from '../global/Magnetic'
import gsap from 'gsap';
import {myEase1, myEase2} from '../utility/contansts'
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowNavigation, setAllowNavigation] = useState(true);
  const reviewsNo = testimonials.length;

  useGSAP(() => {
    const split = SplitText.create(".testimonials-desc-text", {
      type: "lines",
      autoSplit: true,
      mask: "lines"
    })

    gsap.fromTo(split.lines, 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: {
          amount: .4
        }
      })
  }, [activeIndex])

  const toggleAllowNavigation = () => {
    setAllowNavigation(false);
    setTimeout(() => {
      setAllowNavigation(true);
    }, 800) // same as animation duration
  }

  const handleNext = () => {
    if (!allowNavigation) return null;
    if (activeIndex >= reviewsNo - 1 ) {
      return setActiveIndex(0);
    }
    setActiveIndex(prev => prev += 1);
    toggleAllowNavigation();
  }

  const handlePrev = () => {
    if (!allowNavigation) return null;
    if (activeIndex == 0) {
      return setActiveIndex(reviewsNo - 1);
    }
    setActiveIndex(prev => prev -= 1);
    toggleAllowNavigation();
  }

  return (
    <section className='relative w-full h-[105vh] bg-myBlack text-myWhite my-[200px] p-mobile lg:p-desktop-h flex flex-col justify-center items-center overflow-hidden'>
      {/* TITLE TEXTS */}
      <div className='absolute left-0 top-0 p-mobile lg:p-desktop-h flex justify-between w-full text-14-body'>
        <span className='w-[65%]'>Testimonials</span>

        <div className='w-[35%] hidden lg:inline-block'>
          <span>@2022 - 2025</span>
          <div className='opacity-40 mt-[15px] flex flex-col gap-y-[3px]'>
            <span>Designer & Developer</span>
            <span>Meshach Nsude</span>
          </div>
        </div>

        <span>/03</span>
      </div>

      {/* TESTIMONIAL MODAL */}
      <div className='w-full flex flex-col lg:flex-row items-center lg:px-desktop-h'>
        <div className='w-[67%] lg:w-[65%] flex justify-center'>
          <TestimonialImageReveal testimonials={testimonials} activeIndex={activeIndex} allowNavigation={allowNavigation} />
        </div>
        
        <div className='w-full lg:w-[22%]'>
          <div className='flex flex-col gap-y-[10px] mb-[25px]'>
            <span className='text-45-title testimonials-desc-text'>{testimonials[activeIndex].name}</span>
            <span className='opacity-40 text-14-body testimonials-desc-text'>{testimonials[activeIndex].title}</span>
          </div>

          <p className='text-16-body lg:text-25-body testimonials-desc-text'>{testimonials[activeIndex].review}</p>

          <div className='absolute flex gap-x-[15px] bottom-[10%] lg:bottom-[25%]'>
            <Magnetic>
              <ButtonHighlight 
                handleClick={handlePrev}
                styles={'border-myWhite/40 rounded-[60px]'} allowEvents={true}>  
                <div className='w-[60px] aspect-square flex justify-center items-center arrow-icon-parent'>
                  <ArrowIcon right={false} />
                </div>
              </ButtonHighlight>
            </Magnetic>

            <Magnetic>
              <ButtonHighlight 
                handleClick={handleNext}
                styles={'border-myWhite/40 rounded-[60px]'} allowEvents={true}>  
                <div className='w-[60px] aspect-square flex justify-center items-center arrow-icon-parent'>
                  <ArrowIcon />
                </div>
              </ButtonHighlight>
            </Magnetic>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Testimonials;