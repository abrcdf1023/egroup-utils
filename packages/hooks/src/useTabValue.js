import React from 'react';
import queryString from 'query-string';

export default function useTabValue({ history, location, defaultValue = 0 }) {
  const search = React.useMemo(() => queryString.parse(location.search), [
    location.search
  ]);
  const [tabValue, setTabValue] = React.useState(
    Number(search.tab) || defaultValue
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
