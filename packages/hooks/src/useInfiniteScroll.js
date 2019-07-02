import React from 'react';

export default function useInfiniteScroll({
  defaultValue,
  isLoading,
  maxPage
}) {
  const [page, setPage] = React.useState(defaultValue || 0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (page + 1 > maxPage) return;
      if (isLoading) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(value => value + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, maxPage, page]);

  return [page, setPage];
}
