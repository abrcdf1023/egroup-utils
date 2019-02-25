import { createActions } from './utils/index.js'

/**
 * create fetch get reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusInitialState
 * @param {Object} cusActions
 */
const createFetchReducer = (config, cusInitialState, cusActions) => {
  return createActions(config, cusInitialState, cusActions)
}

export default createFetchReducer