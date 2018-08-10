import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createActions, createInitialState } from './utils/index.js'

/**
 * create default fetch reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusActions
 * @param {Object} cusInitialState
 */
const createFetchReducer = (config, cusActions, cusInitialState) => {
  const actions = createActions(config)
  const initialState = createInitialState(config)
  return handleActions({
    ...actions,
    ...cusActions,
  }, fromJS({
    ...initialState,
    ...cusInitialState,
  }))
}

export default createFetchReducer
