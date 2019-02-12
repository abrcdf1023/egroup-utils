/**
 * Make a take action
 * @param {String} take 
 */
export default function makeTakeAction(take) {
  return {
    [take]: state => state.set('isError', false),
  }
}