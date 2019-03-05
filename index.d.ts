import { Base64 } from "js-base64";
import { handleActions } from "redux-actions";
import { Map } from "immutable";

interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export function createFetchReducer(
  config: Config,
  cusInitialState?: object | Map<string, any>,
  cusActions?: object
);

export function createObservableApi(api: Function, payload: object): void;

export function base64ToObject(b64String: String): void;
