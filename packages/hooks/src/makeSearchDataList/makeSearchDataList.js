import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

function makeUsePayload(fromKey, sizeKey, queryKey, defaultValues) {
  return function usePayload() {
    const location = useLocation();
    const [payload, setPayload] = React.useState({
      ...defaultValues,
      ...queryString.parse(location.search)
    });
    const [formPayload, setFormPayload] = React.useState();

    const handleSearchChange = e => {
      const query = e.target.value;
      setFormPayload(value => ({
        ...value,
        [queryKey]: query
      }));
    };

    const handleSearchSubmit = e => {
      e.preventDefault();
      setPayload(value => ({
        ...value,
        ...formPayload,
        [fromKey]: '0'
      }));
    };

    const handleChangePage = (event, { page, rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [fromKey]: page * rowsPerPage
      };
      setPayload(newPayload);
    };

    const handleChangeRowsPerPage = (event, { page, rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [fromKey]: '0',
        [sizeKey]: rowsPerPage
      };
      setPayload(newPayload);
    };

    return {
      handleSearchChange,
      handleSearchSubmit,
      handleChangePage,
      handleChangeRowsPerPage,
      payload,
      setPayload,
      formPayload,
      setFormPayload
    };
  };
}

export default function makeSearchDataList(options) {
  const {
    fromKey = 'from',
    sizeKey = 'size',
    queryKey = 'query',
    defaultValues = {
      [fromKey]: 0,
      [sizeKey]: 10
    }
  } = options || {};

  const usePayload = makeUsePayload(fromKey, sizeKey, queryKey, defaultValues);

  return function useSearchDataList({ fetchGet, history }) {
    const {
      handleSearchChange,
      handleSearchSubmit,
      handleChangePage,
      handleChangeRowsPerPage,
      payload,
      setPayload,
      formPayload,
      setFormPayload
    } = usePayload();

    React.useEffect(() => {
      if (fetchGet) {
        fetchGet(payload);
      }
      if (history) {
        history.push({
          search: queryString.stringify(payload)
        });
      }
    }, [fetchGet, history, payload]);

    return {
      handleSearchChange,
      handleSearchSubmit,
      handleChangePage,
      handleChangeRowsPerPage,
      payload,
      setPayload,
      formPayload,
      setFormPayload
    };
  };
}
