import { createActions } from './utils/index.js'

/**
 * create fetch delete reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusActions
 * @param {Object} cusInitialState
 */
const createFetchDeleteReducer = (config, cusActions, cusInitialState) => {
  return createActions(config, cusActions, cusInitialState, 'DELETE')
}

export default createFetchDeleteReducer