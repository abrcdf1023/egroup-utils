import { set } from 'immutable'

/**
 * Make a request action
 * @param {String} request 
 */
export default function makeRequestAction(request) {
  return {
    [request]: state => set(state, 'isLoading', true),
  }
}