import { handleActions } from "redux-actions";
import { Map } from "immutable";

import initialState from "./initialState";

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export default function createActions(
  config: Config,
  cusInitialState?: object | Map<string, any>,
  cusActions?: object
);
