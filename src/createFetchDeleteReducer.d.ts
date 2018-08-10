import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string | Array<any>;
  failure: string;
}

export function createFetchDeleteReducer(
  config: Config,
  cusActions?: object,
  cusInitialState?: object,
): void;
