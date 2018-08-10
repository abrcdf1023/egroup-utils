import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import createInitialState from './createInitialState'
import makeFetchActions from './makeFetchActions'

/**
 * create fetch reducer by method,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * Fourth arg is private method to create different type reducer
 * @param {Object} config
 * @param {Object} cusActions
 * @param {Object} cusInitialState
 * @param {String} method
 */
export default function createActions(config, cusActions, cusInitialState, method) {
  const actions = makeFetchActions(config, method)
  const initialState = createInitialState()
  return handleActions({
    ...actions,
    ...cusActions,
  }, fromJS({
    ...initialState,
    ...cusInitialState,
  }))
}
