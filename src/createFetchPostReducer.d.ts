import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export function createFetchPostReducer(
  config: Config,
  cusInitialState?: object,
  cusActions?: object,
): void;
