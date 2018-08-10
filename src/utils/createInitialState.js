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
      error: false,
      data: {},
    },
    post: {
      isLoading: false,
      error: false,
      data: {},
    },
    patch: {
      isLoading: false,
      error: false,
      data: {},
    },
    delete: {
      isLoading: false,
      error: false,
      data: {},
    }
  }
}
