/**
 * Create initialState
 * 
 * @private
 * @returns {Object}
 */
export default function createInitialState() {
  return {
    get: {
      isLoading: false,
      isError: false,
      data: {},
    },
    post: {
      isLoading: false,
      isError: false,
      data: {},
    },
    patch: {
      isLoading: false,
      isError: false,
      data: {},
    },
    delete: {
      isLoading: false,
      isError: false,
      data: {},
    }
  }
}
