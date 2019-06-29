import React from 'react';
import queryString from 'query-string';

export default function useSearchBar({
  fetchGet,
  history,
  location,
  defaultFilterValues = {}
}) {
  const search = queryString.parse(location.search);
  const [query, setQuery] = React.useState(search.query);
  const [filterValues, setFilterValues] = React.useState(defaultFilterValues);
  const [payload, setPayload] = React.useState({
    from: '0',
    size: '10',
    ...search
  });

  React.useEffect(() => {
    if (location.search === '') {
      setPayload({
        from: '0',
        size: '10'
      });
    }
  }, [location.search]);

  React.useEffect(() => {
    history.push({
      search: queryString.stringify(payload)
    });
  }, [history, payload]);

  React.useEffect(() => {
    fetchGet(payload);
  }, [fetchGet, payload]);

  const handleSearchChange = e => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    setPayload(state => ({
      ...state,
      from: '0',
      query,
      ...filterValues
    }));
  };

  const handleChangePage = (event, { page, rowsPerPage }) => {
    setPayload(state => ({
      ...state,
      from: page * rowsPerPage
    }));
  };

  const handleChangeRowsPerPage = (event, { page, rowsPerPage }) => {
    setPayload(state => ({
      ...state,
      from: '0',
      size: rowsPerPage
    }));
  };

  return {
    handleSearchChange,
    handleSearchSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    payload,
    filterValues,
    setFilterValues
  };
}
