import _isArray from 'lodash/isArray'

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
