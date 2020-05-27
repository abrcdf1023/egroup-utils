import { Collection } from 'immutable';

interface SuccessConfig {
  setData(newState: Collection<any, any>, action: any): Collection<any, any>;
}

interface CreateFetchReducerConfig {
  take: string;
  request: string;
  cancel?: string;
  success: string | [string, SuccessConfig];
  failure: string;
}

export default function createFetchReducer(
  config: CreateFetchReducerConfig,
  cusInitialState?: Collection<string, any>,
  cusActions?: object
);
