import React, { FunctionComponent, useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypewriterProps {
  text: string;
}

const Typewriter: FunctionComponent<TypewriterProps> = ({ text }) => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [text],
      typeSpeed: 50, // Vitesse de frappe
    };

    const typed = new Typed(typewriterRef.current, options);

    return () => {
      typed.destroy();
    };
  }, [text]);

  return (
    <div className='w-full text-center'>
      <h3 className='font-bold text-3xl' ref={typewriterRef}></h3>
    </div>
  );
};

export default Typewriter;
