function makeCancelAction(cancel) {
  const cancelState = !cancel
    ? {}
    : {
        [cancel]: state => state.set("isLoading", false)
      };
  return cancelState;
}

/**
 * To handle process of fetch actions
 * @private
 * @param {Object|null} config
 * @return {Object}
 */
export default function makeFetchActions({
  take,
  request,
  success,
  cancel,
  failure
}) {
  return {
    [take]: state => state.set("isError", false),
    [request]: state => state.set("isLoading", true),
    [success]: (state, action) => {
      let newState = state.set("isLoading", false);
      newState = newState.set("latestUpdated", new Date().getTime());
      if (typeof action.payload !== 'undefined') {
        newState = newState.set("data", action.payload);
      }
      return newState;
    },
    ...makeCancelAction(cancel),
    [failure]: (state, action) => {
      let newState = state.set("isLoading", false);
      newState = newState.set("isError", true);
      if (action.payload) {
        newState = newState.set("error", action.payload);
      }
      return newState;
    }
  };
}
