import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

/**
 * success config option
 * example: [FETCH_GET_SUCCESS, {
 *  mergeData: true,
 * }]
 * options: mergeData, mergeDeepData
 * To figure out what's different please read immutablejs documentation
 */
export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string | Array<any>;
  failure: string;
}

export function createFetchPostReducer(
  config: Config,
  cusInitialState?: object,
  cusActions?: object,
): void;
