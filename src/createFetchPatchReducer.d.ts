import createActions from './utils/createActions'

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export function createFetchPatchReducer(
  config: Config,
  cusInitialState?: object,
  cusActions?: object,
): void;
