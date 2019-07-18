import React from 'react';
import queryString from 'query-string';

export default function useSearchDataList({
  history,
  location,
  fetchGet,
  defaultValue = {
    from: '0',
    size: '10'
  }
}) {
  const search = React.useMemo(() => queryString.parse(location.search), [
    location.search
  ]);
  const [payload, setPayload] = React.useState({
    ...defaultValue,
    ...search
  });

  React.useEffect(() => {
    fetchGet({
      ...defaultValue,
      ...search
    });
    setPayload(value => ({
      ...defaultValue,
      ...search
    }));
  }, [defaultValue, fetchGet, search]);

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
