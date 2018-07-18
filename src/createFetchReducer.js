import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import createStates from './utils/createStates'
import createInitialState from './utils/createInitialState'

/**
 * create default fetch reducer,
 * First arg is the reducer scheme
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} arg
 * @param {Object} cusState
 * @param {Object} cusInitialState
 */
const createFetchReducer = (arg, cusState, cusInitialState) => {
  const states = createStates(arg)
  const initialState = createInitialState(arg)
  return handleActions({
    ...states,
    ...cusState,
  }, fromJS({
    ...initialState,
    ...cusInitialState,
  }))
}

export default createFetchReducer
