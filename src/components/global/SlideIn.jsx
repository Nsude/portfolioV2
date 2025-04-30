import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/all';

const SlideIn = ({children, delay = 0}) => {
  const animBoxesRef = useRef([]);
  const containerRef = useRef();

  useGSAP(() => {
    const boxes = animBoxesRef.current;
    const con = containerRef.current;

    if (!boxes || !con) return;
    gsap.killTweensOf(boxes);

    let ease = CustomEase.create("custom", "0.76, 0, 0.24, 1");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.to(boxes, {transform: "translateY(0%)", duration: 0.6, ease: "power2.inOut", stagger: 0.05, delay});
        observer.unobserve(entry.target);
      })
    })

    observer.observe(con);

    return () => observer.disconnect();

  }, {scope: containerRef})



  return (
    <div ref={containerRef}>
      {
        React.Children.map(children, (child, i) => (
          <div key={i} className='overflow-hidden py-[3px]'>
            <div ref={(el) => animBoxesRef.current[i] = el} className='translate-y-[110%]'> {child} </div>
          </div>
        ))
      }
    </div>
  )
}

export default SlideIn;