import { handleActions } from "redux-actions";

import initialState from "./initialState";

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export default function createFetchReducer(
  config: Config,
  cusInitialState?: object | Map<string, any>,
  cusActions?: object
);
