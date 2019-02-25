import { handleActions } from 'redux-actions'

import initialState from '../initialState'
import makeFetchActions from './makeFetchActions'

/**
 * create fetch reducer by config,
 * First arg is the config
 * Second arg can replace the initialState you need
 * Third arg can replace the action function you need
 * @private
 * @param {Object} config
 * @param {Object|null} cusInitialState
 * @param {Object|null} cusActions
 */
export default function createActions(config, cusInitialState, cusActions) {
  const actions = makeFetchActions(config)
  return handleActions({
    ...actions,
    ...cusActions,
  }, initialState.merge(cusInitialState))
}
