import { createActions } from './utils/index.js'

/**
 * create fetch delete reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusInitialState
 * @param {Object} cusActions
 */
const createFetchDeleteReducer = (config, cusInitialState, cusActions) => {
  return createActions(config, cusInitialState, cusActions, 'DELETE')
}

export default createFetchDeleteReducer