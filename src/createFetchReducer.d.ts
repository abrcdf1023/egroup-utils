import { fromJS } from '@types/immutable'
import { handleActions } from '@types/redux-actions'

export interface RequestActions {
  take: string;
  request: string;
  cancel?: string;
  success: string | array;
  failure: string;
}

export interface Config {
  get?: RequestActions;
  post?: RequestActions;
  patch?: RequestActions;
  delete?: RequestActions;
}

export function createFetchReducer(
  config: Config,
  cusActions?: object,
  cusInitialState?: object,
): void;
