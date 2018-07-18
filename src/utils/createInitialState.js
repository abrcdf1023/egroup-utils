import _isArray from 'lodash/isArray'

/**
 * Accroding to passed method type to add initialState
 * 
 * @private
 * @param {Object} arg Customized create reducer scheme
 * @param {Object} arg.get
 * @param {String} arg.get.request
 * @param {String|Array} arg.get.success
 * @param {String} arg.get.failure
 * @param {Object} arg.post
 * @param {String} arg.post.request
 * @param {String} arg.post.success
 * @param {String} arg.post.failure
 * @param {Object} arg.patch
 * @param {String} arg.patch.request
 * @param {String} arg.patch.success
 * @param {String} arg.patch.failure
 * @param {Object} arg.delete
 * @param {String} arg.delete.request
 * @param {String} arg.delete.success
 * @param {String} arg.delete.failure
 * @returns {Object}
 */
export default function createInitialState(arg) {
  let initialState = {}
  if (arg.get) {
    initialState = {
      isGetting: false,
      isEmpty: true,
      error: false,
    }
    const { success } = arg.get
    if (_isArray(success) && success[1].data) {
      initialState = {
        ...initialState,
        data: {},
      }
    }
  }
  if (arg.post) {
    initialState = {
      ...initialState,
      isPosting: false,
      postError: false,
    }
  }
  if (arg.patch) {
    initialState = {
      ...initialState,
      isPatching: false,
      patchError: false,
    }
  }
  if (arg.del) {
    initialState = {
      ...initialState,
      isDeleting: false,
      deleteError: false,
    }
  }
  return initialState
}
