import React from 'react';

/**
 * Get if page Y offset is over 0.
 * @param {*} defaultValue
 */
export default function useIsPageYOffsetPN(defaultValue = false) {
  const [isPageYOffsetPN, setIsPageYOffsetPN] = React.useState(defaultValue);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsPageYOffsetPN(true);
      } else {
        setIsPageYOffsetPN(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isPageYOffsetPN, setIsPageYOffsetPN];
}
