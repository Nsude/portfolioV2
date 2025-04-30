import React, { useEffect, useRef } from 'react'
import useDevice from '../hooks/useDevice';

const SplitLineText = ({children}) => {
  const textRef = useRef();
  const {width: deviceWidth} = useDevice();

  useEffect(() => {
    const textCon = textRef.current;
    if (!textCon) return;

    let text = textCon.innerText;
    let rect = textCon.getBoundingClientRect();
    
  }, [deviceWidth])

  return (
    <div>
      <div ref={textRef}>
        {children}
      </div>
    </div>
  )
}

export default SplitLineText;