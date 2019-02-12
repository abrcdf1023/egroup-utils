import { createActions } from './utils/index.js'

/**
 * create fetch patch reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusInitialState
 * @param {Object} cusActions
 */
const createFetchPatchReducer = (config, cusInitialState, cusActions) => {
  return createActions(config, 'PATCH', cusInitialState, cusActions)
}

export default createFetchPatchReducer