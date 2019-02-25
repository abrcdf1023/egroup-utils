/**
 * Make a take action
 * @private
 * @param {String} take 
 * @returns {Object}
 */
export default function makeTakeAction(take) {
  return {
    [take]: state => state.set('isError', false),
  }
}