function checkConfig({ take, request, success, failure }) {
  if (!take) throw new Error('take type undefined.')
  if (!request) throw new Error('request type undefined.')
  if (!success) throw new Error('success type undefined.')
  if (!failure) throw new Error('failure type undefined.')
}

function makeCancelAction(cancel) {
  const cancelState = !cancel ?
    {} :
    {
      [cancel]: state => state.set('isLoading', false),
    }
  return cancelState
}

/**
 * To handle process of fetch actions
 * @private
 * @param {Object|null} config
 * @return {Object}
 */
export default function makeFetchActions(config) {
  if (!config) return {}
  const { take, request, success, cancel, failure } = config
  checkConfig(config)
  return {
    [take]: state => state.set('isError', false),
    [request]: state => state.set('isLoading', true),
    [success]: (state, action) => {
      let newState = state.set('isLoading', false)
      if (action.payload) {
        newState = newState.set('data', action.payload)
      }
      return newState
    },
    ...makeCancelAction(cancel),
    [failure]: (state, action) => {
      let newState = state.set('isLoading', false)
      newState = newState.set('isError', true)
      if (action.payload) {
        newState = newState.set('error', action.payload)
      }
      return newState
    },
  }
}