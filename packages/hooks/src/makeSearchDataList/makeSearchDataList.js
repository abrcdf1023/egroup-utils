import React from 'react';
import queryString from 'query-string';

export default function makeSearchDataList(startKey, sizeKey, options = {}) {
  const {
    defaultValues = {
      [startKey]: 0,
      [sizeKey]: 10
    },
    filter
  } = options;
  return function useSearchDataList({ history, location, fetchGet }) {
    const ref = React.useRef();
    const search = React.useMemo(() => queryString.parse(location.search), [
      location.search
    ]);
    const [payload, setPayload] = React.useState({
      ...defaultValues,
      ...search
    });

    React.useEffect(() => {
      ref.current = search;
    }, [search]);

    React.useEffect(() => {
      if (filter && !filter(ref.current, search)) return;
      fetchGet({
        ...defaultValues,
        ...search
      });
      setPayload(value => ({
        ...defaultValues,
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
