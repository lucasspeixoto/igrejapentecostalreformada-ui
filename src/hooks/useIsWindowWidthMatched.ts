import { useEffect, useState } from 'react';

const useIsWindowWidthMatched = (innerWidth: number) => {
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

export default useIsWindowWidthMatched;