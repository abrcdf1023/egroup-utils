import { handleActions } from "redux-actions";

import initialState from "./initialState";
import makeFetchActions from "./lib/makeFetchActions";

function checkConfig(config) {
  if (!config) {
    throw new Error("Config is required but it's undefined.");
  } else {
    const { take, request, success, failure } = config;
    if (!take) throw new Error("Config take is required but it's undefined.");
    if (!request)
      throw new Error("Config request is required but it's undefined.");
    if (!success)
      throw new Error("Config success is required but it's undefined.");
    if (!failure)
      throw new Error("Config failure is required but it's undefined.");
  }
}

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
export default function createFetchReducer(
  config,
  cusInitialState,
  cusActions
) {
  checkConfig(config);
  const actions = makeFetchActions(config);
  return handleActions(
    {
      ...actions,
      ...cusActions
    },
    initialState.merge(cusInitialState)
  );
}
