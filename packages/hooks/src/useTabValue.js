import React from 'react';
import queryString from 'query-string';

export default function useTabValue({ history, location, defaultValue = 0 }) {
  const search = React.useMemo(() => queryString.parse(location.search), [
    location.search
  ]);
  const tabValue = Number(search.tab) || defaultValue;

  const setTabValue = React.useCallback(
    value => {
      history.push({
        search: queryString.stringify({
          tab: value
        })
      });
    },
    [history]
  );

  const handleChange = (event, newValue) => {
    history.push({
      search: queryString.stringify({
        tab: newValue
      })
    });
  };

  return {
    tabValue,
    setTabValue,
    handleChange
  };
}
