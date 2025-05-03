import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { myEase1, myEase2 } from '../utility/contansts';

const PreviewModal = ({projects, activePreview}) => {
  const previewsRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    const previews = previewsRef.current;
    const con = containerRef.current;
    
    if (!(previews && con)) return;
    gsap.killTweensOf(previews);

    // move the previews to show a new preview on each move
    const tranlateFactor = 100 / projects.length; 

    gsap.to(previews, {
      yPercent: (-tranlateFactor * activePreview),
      duration: 0.6,
      ease: myEase1
    })
    

  }, {scope: containerRef, dependencies: [activePreview]})

  return (
    <div ref={containerRef} className='w-[250px] pointer-events-none z-[2] aspect-square overflow-hidden'>
      <div ref={previewsRef}>
        {
          projects.map((item, i) => (
            <div key={i} className={`w-[250px] relative aspect-square flex items-center justify-center`}
              style={{backgroundColor: item.color}}
             >
              <span className='absolute left-[50%] top-[50%] translate-[-50%]'>Image {i + 1}</span>
              <img 
                src={item.preview}
                className='w-[86%] border-1 border-black rounded-sm'
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PreviewModal;