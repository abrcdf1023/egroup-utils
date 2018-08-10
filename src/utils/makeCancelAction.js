import { set } from 'immutable'

/**
 * Make a cancel action
 * Cancel action is not required in createFetchReducer so if the value is null
 * it'll return empty object.
 * @param {String|null} cancel
 */
export default function makeCancelAction(cancel) {
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isLoading', false),
  }
  return cancelState
}