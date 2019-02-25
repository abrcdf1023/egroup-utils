
import { handleActions } from 'redux-actions'

import initialState from './initialState'
import makeFetchActions from './lib/makeFetchActions'

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
export default function createFetchReducer(config, cusInitialState, cusActions) {
  const actions = makeFetchActions(config)
  return handleActions({
    ...actions,
    ...cusActions,
  }, initialState.merge(cusInitialState))
}