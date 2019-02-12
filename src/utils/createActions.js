import { handleActions } from 'redux-actions'

import initialState from '../initialState'
import makeFetchActions from './makeFetchActions'

/**
 * create fetch reducer by method,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * Fourth arg is private method to create different type reducer
 * @private
 * @param {Object} config
 * @param {Object} cusInitialState
 * @param {Object} cusActions
 * @param {String} method
 */
export default function createActions(config, cusInitialState, cusActions, method) {
  const actions = makeFetchActions(config, method)
  return handleActions({
    ...actions,
    ...cusActions,
  }, initialState.merge(cusInitialState))
}
