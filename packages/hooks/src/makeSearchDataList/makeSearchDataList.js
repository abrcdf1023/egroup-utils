import React from 'react';
import queryString from 'query-string';
import usePrevious from '../usePrevious';

export default function makeSearchDataList(startKey, sizeKey, options = {}) {
  const {
    defaultValues = {
      [startKey]: 0,
      [sizeKey]: 10
    },
    filter
  } = options;
  return function useSearchDataList({ history, location, fetchGet }) {
    const search = React.useMemo(() => queryString.parse(location.search), [
      location.search
    ]);
    const preSearch = usePrevious(search);
    const [payload, setPayload] = React.useState({
      ...defaultValues,
      ...search
    });

    React.useEffect(() => {
      if (filter && !filter(preSearch, search)) return;
      fetchGet({
        ...defaultValues,
        ...search
      });
      setPayload(value => ({
        ...defaultValues,
        ...search
      }));
    }, [fetchGet, preSearch, search]);

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
        [startKey]: '0'
      };
      setPayload(newPayload);
      history.push({
        search: queryString.stringify(newPayload)
      });
    };

    const handleChangePage = (event, { page, rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [startKey]: page * rowsPerPage
      };
      setPayload(newPayload);
      history.push({
        search: queryString.stringify(newPayload)
      });
    };

    const handleChangeRowsPerPage = (event, { page, rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [startKey]: '0',
        [sizeKey]: rowsPerPage
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
  };
}
