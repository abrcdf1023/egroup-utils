import React from 'react';

export default function useIsShowShadow(defaultValue = false) {
  const [isShowShadow, setIsShowShadow] = React.useState(defaultValue);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsShowShadow(true);
      } else {
        setIsShowShadow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isShowShadow, setIsShowShadow];
}
