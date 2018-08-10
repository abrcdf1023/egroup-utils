import { merge } from 'immutable'

/**
 * Make a failure action
 * @param {String} failure 
 */
export default function makeFailureAction(failure) {
  return {
    [failure]: (state, action) => merge(state, {
      isLoading: false,
      isError: action.error,
      error: action.payload,
    }),
  }
}