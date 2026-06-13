import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = React.useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Main dot follows instantly
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Ring follows with lag
      gsap.to(followerRef.current, {
        x,
        y,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          width: isHovering ? '6px' : '10px',
          height: isHovering ? '6px' : '10px',
          marginTop: isHovering ? '-3px' : '-5px',
          marginLeft: isHovering ? '-3px' : '-5px',
        }}
      />
      <div
        ref={followerRef}
        className="cursor-follower hidden md:block"
        style={{
          width: isHovering ? '60px' : '30px',
          height: isHovering ? '60px' : '30px',
          marginTop: isHovering ? '-30px' : '-15px',
          marginLeft: isHovering ? '-30px' : '-15px',
          borderColor: isHovering ? 'var(--brand-orange)' : 'var(--brand-blue)',
        }}
      />
    </>
  );
};

export default CustomCursor;
