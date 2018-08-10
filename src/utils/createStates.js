import { merge, mergeDeep, set } from 'immutable'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'

/**
 * Make a success state
 * 
 * If without config it replaces data when get success
 * or you can config with mergeData or mergeDeepData
 * to merge success data
 * @private
 * @param {String|Array} success
 * @param {Object} otherState append other states to so we can reuse this function
 * @returns {Object}
 */
function makeSuccessState(success, otherState) {
  // get date function to prevent undefined error and make sure all state will have data state
  const getData = action => action.payload || {}
  // success is array means it with customize behavior
  if(_isArray(success)) {
    const actionType = success[0]
    const options = success[1]
    // If mergeData is true default is null
    if (options.mergeData) {
      return {
        [actionType]: (state, action) => {
          return merge(state, {
            ...otherState,
            data: merge(state.get('data'), getData(action)),
            isEmpty: _isEmpty(getData(action)),
          })
        },
      }
    }
    // If mergeDeepData is true default is null
    else if (options.mergeDeepData) {
      return {
        [actionType]: (state, action) => {
          return merge(state, {
            ...otherState,
            data: mergeDeep(state.get('data'), getData(action)),
            isEmpty: _isEmpty(getData(action)),
          })
        },
      }
    }
  }
  // without config is default behavior
  return {
    [success]: (state, action) => {
      return merge(state, {
        ...otherState,
        data: getData(action),
        isEmpty: _isEmpty(getData(action)),
      })
    },
  }
}

/**
 * Make a cancel state
 * Cancel state is not required in createFetchReducer so if the value is null
 * it'll return empty object.
 * @param {String|null} cancel 
 * @param {String} isLoading 
 */
function makeCancelState(cancel, isLoading) {
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, isLoading, false),
  }
  return cancelState
}

/**
 * To check is vailded config
 * 
 * @private
 * @param {String} method 
 * @param {Object} arg Customized create reducer methods(get,post,patch,delete) scheme
 */
function checkConfig(method, { request, success, failure }) {
  if (!request) throw new Error(`${method} request type undefined.`)
  if (!success) throw new Error(`${method} success type undefined.`)
  if (!failure) throw new Error(`${method} failure type undefined.`)
}

/**
 * Create process to handle fetch get actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
function createGetState({ get }) {
  checkConfig('GET', get)
  const {
    request, success, cancel, failure,
  } = get
  const successState = makeSuccessState(success, {
    isGetting: false,
  })
  const cancelState = makeCancelState(cancel, 'isGetting')
  return {
    [request]: state => merge(state, {
      isGetting: true,
      isEmpty: false,
      error: false,
    }),
    ...successState,
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isGetting: false,
      error: action.error,
      errorMsg: action.payload.message,
    }),
  }
}

/**
 * Create process to handle fetch post actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
function createPostState({ post }) {
  checkConfig('POST', post)
  const {
    request, success, cancel, failure,
  } = post
  const successState = makeSuccessState(success, {
    isPosting: false,
  })
  const cancelState = makeCancelState(cancel, 'isPosting')
  return {
    [request]: state => merge(state, {
      isPosting: true,
      postError: false,
    }),
    ...successState,
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isPosting: false,
      postError: action.error,
      postErrorMsg: action.payload.message,
    }),
  }
}

/**
 * Create process to handle fetch patch actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
function createPatchState({ patch }) {
  checkConfig('PATCH', patch)
  const {
    request, success, cancel, failure,
  } = patch
  const successState = makeSuccessState(success, {
    isPatching: false,
  })
  const cancelState = makeCancelState(cancel, 'isPatching')
  return {
    [request]: state => merge(state, {
      isPatching: true,
      patchError: false,
    }),
    ...successState,
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isPatching: false,
      patchError: action.error,
      patchErrorMsg: action.payload.message,
    }),
  }
}

/**
 * Create process to handle fetch delete actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
function createDeleteState({ del }) {
  checkConfig('DELETE', del)
  const {
    request, success, cancel, failure,
  } = del
  const successState = makeSuccessState(success, {
    isDeleting: false,
  })
  const cancelState = makeCancelState(cancel, 'isDeleting')
  return {
    [request]: state => merge(state, {
      isDeleting: true,
      deleteError: false,
    }),
    ...successState,
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isDeleting: false,
      deleteError: action.error,
      deleteErrorMsg: action.payload.message,
    }),
  }
}

/**
 * Create process to handle all fetch actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
export default function createStates(arg) {
  let states = {}
  if (arg.get) {
    states = createGetState(arg)
  }
  if (arg.post) {
    states = {
      ...states,
      ...createPostState(arg),
    }
  }
  if (arg.patch) {
    states = {
      ...states,
      ...createPatchState(arg),
    }
  }
  if (arg.del) {
    states = {
      ...states,
      ...createDeleteState(arg),
    }
  }
  return states
}
