import React from 'react';

export default function useScrollShowShadow(value) {
  const [isShowShadow, setIsShowShadow] = React.useState(value);

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
