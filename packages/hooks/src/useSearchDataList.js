import React from 'react';
import queryString from 'query-string';

console.error(
  'Error: useSearchDataList is depreciated and it will be removed in next major release. Please use makeInfiniteScroll instead and read doc for more example https://eGroupAI.github.io/egroup-utils.'
);
export default function useSearchDataList({ history, location, fetchGet }) {
  const search = React.useMemo(() => queryString.parse(location.search), [
    location.search
  ]);
  const [payload, setPayload] = React.useState({
    from: '0',
    size: '10',
    ...search
  });

  React.useEffect(() => {
    fetchGet({
      from: '0',
      size: '10',
      ...search
    });
    setPayload(value => ({
      from: '0',
      size: '10',
      ...search
    }));
  }, [fetchGet, search]);

  const handleSearchChange = e => {
    const query = e.target.value;
    setPayload(value => ({
      ...value,
      query
    }));
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    const newPayload = {
      ...payload,
      from: '0'
    };
    setPayload(newPayload);
    history.push({
      search: queryString.stringify(newPayload)
    });
  };

  const handleChangePage = (event, { page, rowsPerPage }) => {
    const newPayload = {
      ...payload,
      from: page * rowsPerPage
    };
    setPayload(newPayload);
    history.push({
      search: queryString.stringify(newPayload)
    });
  };

  const handleChangeRowsPerPage = (event, { page, rowsPerPage }) => {
    const newPayload = {
      ...payload,
      from: '0',
      size: rowsPerPage
    };
    setPayload(newPayload);
    history.push({
      search: queryString.stringify(newPayload)
    });
  };

  return {
    handleSearchChange,
    handleSearchSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    payload,
    setPayload
  };
}
