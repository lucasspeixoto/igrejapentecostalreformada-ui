import { useEffect, useState } from 'react';

const useWindowDimensions = (innerWidth: number) => {
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth <= innerWidth);

  useEffect(() => {
    const windowResizeHandler = () => {
      const matchMediaString = `(max-width: ${innerWidth}px)`;

      if (matchMedia(matchMediaString).matches) {
        setIsMobileSize(true);
      } else {
        setIsMobileSize(false);
      }
    };

    window.addEventListener('resize', windowResizeHandler);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return isMobileSize;
};

export default useWindowDimensions;

/*

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window as Window & typeof globalThis;

  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

*/
