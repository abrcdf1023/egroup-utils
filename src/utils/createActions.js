import { merge, mergeDeep, set } from 'immutable'
import _isArray from 'lodash/isArray'

/**
 * Make a success action
 * 
 * If without config it replaces data when get success
 * or you can config with mergeData or mergeDeepData
 * to merge success data
 * @private
 * @param {String|Array} success
 * @returns {Object}
 */
function makeSuccessAction(success) {
  // get date function to prevent undefined and make sure all state will have data state
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
            isLoading: false,
            data: merge(state.get('data'), getData(action)),
          })
        },
      }
    }
    // If mergeDeepData is true default is null
    else if (options.mergeDeepData) {
      return {
        [actionType]: (state, action) => {
          return merge(state, {
            isLoading: false,
            data: mergeDeep(state.get('data'), getData(action)),
          })
        },
      }
    }
  }
  // without config is default behavior
  return {
    [success]: (state, action) => {
      return merge(state, {
        isLoading: false,
        data: getData(action),
      })
    },
  }
}

/**
 * Make a take action
 * @param {String} take 
 */
function makeTakeAction(take) {
  return {
    [take]: state => set(state, 'isError', false),
  }
}

/**
 * Make a request action
 * @param {String} request 
 */
function makeRequestAction(request) {
  return {
    [request]: state => set(state, 'isLoading', true),
  }
}

/**
 * Make a cancel action
 * Cancel action is not required in createFetchReducer so if the value is null
 * it'll return empty object.
 * @param {String|null} cancel
 */
function makeCancelAction(cancel) {
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isLoading', false),
  }
  return cancelState
}

/**
 * Make a failure action
 * @param {String} failure 
 */
function makeFailureAction(failure) {
  return {
    [failure]: (state, action) => merge(state, {
      isLoading: false,
      isError: action.error,
      error: action.payload,
    }),
  }
}

/**
 * To check is vailded config
 * 
 * @private
 * @param {String} method 
 * @param {Object} arg Customized create reducer methods(get,post,patch,delete) scheme
 */
function checkConfig({ take, request, success, failure }, method) {
  if (!take) throw new Error(`${method} take type undefined.`)
  if (!request) throw new Error(`${method} request type undefined.`)
  if (!success) throw new Error(`${method} success type undefined.`)
  if (!failure) throw new Error(`${method} failure type undefined.`)
}

/**
 * Create process to handle process of fetch actions
 * 
 * @private
 * @param {Object|null} arg
 * @return {Object}
 */
function makeFetchActions(config, method) {
  if (!config) return {}
  const { take, request, success, cancel, failure } = config
  checkConfig(config, method)
  return {
    ...makeTakeAction(take),
    ...makeRequestAction(request),
    ...makeSuccessAction(success),
    ...makeCancelAction(cancel),
    ...makeFailureAction(failure),
  }
}

/**
 * Create process to handle all type of fetch actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
export default function createActions(arg) {
  return {
    get: makeFetchActions(arg.get, 'GET'),
    post: makeFetchActions(arg.post, 'POST'),
    patch: makeFetchActions(arg.patch, 'PATCH'),
    delete: makeFetchActions(arg.delete, 'DELETE'),
  }
}
