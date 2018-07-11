import { merge, mergeDeep, set } from 'immutable'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'

function successIsArray(success) {
  const type = success[0]
  const options = success[1]
  return {
    [type]: (state, action) => {
      if (options.data) {
        let data = action.payload
        if (options.mergeData) {
          data = merge(state.get('data'), action.payload)
        } else if (options.mergeDeepData) {
          data = mergeDeep(state.get('data'), action.payload)
        }
        return merge(state, {
          isGetting: false,
          data,
          isEmpty: _isEmpty(action.payload),
        })
      }
      return merge(state, {
        isGetting: false,
        isEmpty: _isEmpty(action.payload),
      })
    },
  }
}

function checkRequestArg(method, { request, success, failure }) {
  if (!request) throw new Error(`${method} request type undefined.`)
  if (!success) throw new Error(`${method} success type undefined.`)
  if (!failure) throw new Error(`${method} failure type undefined.`)
}

function createGetState({ get }) {
  checkRequestArg('GET', get)
  const {
    request, success, cancel, failure,
  } = get
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isGetting', false),
  }
  const successState = _isArray(success) ? successIsArray(success) : {
    [success]: (state, action) => merge(state, {
      isGetting: false,
      data: action.payload,
      isEmpty: _isEmpty(action.payload),
    }),
  }
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

function createPostState({ post }) {
  checkRequestArg('POST', post)
  const {
    request, success, cancel, failure,
  } = post
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isPosting', false),
  }
  return {
    [request]: state => merge(state, {
      isPosting: true,
      postError: false,
    }),
    [success]: state => set(state, 'isPosting', false),
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isPosting: false,
      postError: action.error,
      postErrorMsg: action.payload.message,
    }),
  }
}

function createPatchState({ patch }) {
  checkRequestArg('PATCH', patch)
  const {
    request, success, cancel, failure,
  } = patch
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isPatching', false),
  }
  return {
    [request]: state => merge(state, {
      isPatching: true,
      patchError: false,
    }),
    [success]: state => set(state, 'isPatching', false),
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isPatching: false,
      patchError: action.error,
      patchErrorMsg: action.payload.message,
    }),
  }
}

function createDeleteState({ del }) {
  checkRequestArg('DELETE', del)
  const {
    request, success, cancel, failure,
  } = del
  const cancelState = !cancel ? {} : {
    [cancel]: state => set(state, 'isDeleting', false),
  }
  return {
    [request]: state => merge(state, {
      isDeleting: true,
      deleteError: false,
    }),
    [success]: state => set(state, 'isDeleting', false),
    ...cancelState,
    [failure]: (state, action) => merge(state, {
      isDeleting: false,
      deleteError: action.error,
      deleteErrorMsg: action.payload.message,
    }),
  }
}

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
