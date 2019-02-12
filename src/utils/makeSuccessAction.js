/**
 * Make a success action
 * @private
 * @param {String} success
 * @returns {Object}
 */
export default function makeSuccessAction(success) {
  return {
    [success]: (state, action) => {
      if (action.payload) {
        return state.merge({
          isLoading: false,
          data: action.payload,
        })
      }
      return state.set('isLoading', false)
    },
  }
}