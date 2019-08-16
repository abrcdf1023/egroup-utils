import React from 'react';

console.warn(
  'Warning: useIsPageYOffsetPN is depreciated and it will be removed in next major release. Please use `@material-ui/core/useScrollTrigger` instead.'
);
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
