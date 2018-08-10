import { set } from 'immutable'

/**
 * Make a take action
 * @param {String} take 
 */
export default function makeTakeAction(take) {
  return {
    [take]: state => set(state, 'isError', false),
  }
}