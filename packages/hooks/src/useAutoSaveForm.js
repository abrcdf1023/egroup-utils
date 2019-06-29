import React from 'react';

export default function useAutoSaveForm({ fetchGet, fetchPatch }) {
  React.useEffect(() => {
    fetchGet();
  }, [fetchGet]);

  const handleFormSubmit = values => {
    if (fetchPatch) {
      fetchPatch(values.toJS());
    }
  };

  const handleFormChange = (values, dispatch, props, previousValues) => {
    // To avoid submit when pass initialValues
    if (previousValues.isEmpty()) {
      return;
    }
    // To avoid submit when values not be changed
    if (values.equals(previousValues)) {
      return;
    }
    // NOTICE: SetTimeout is a hacky solution without it can't submit successfully.
    setTimeout(() => {
      dispatch(props.submit());
    }, 1);
  };

  return {
    handleFormSubmit,
    handleFormChange
  };
}
