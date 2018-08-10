import { createActions } from './utils/index.js'

/**
 * create fetch patch reducer,
 * First arg is the config
 * Second arg can replace the action function you need
 * Third arg can replace the initialState you need
 * 
 * @param {Object} config
 * @param {Object} cusActions
 * @param {Object} cusInitialState
 */
const createFetchPatchReducer = (config, cusActions, cusInitialState) => {
  return createActions(config, cusActions, cusInitialState, 'PATCH')
}

export default createFetchPatchReducer