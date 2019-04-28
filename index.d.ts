import { Base64 } from "js-base64";
import { handleActions } from "redux-actions";
import { Collection } from "immutable";

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

export function createFetchReducer(
  config: CreateFetchReducerConfig,
  cusInitialState?: Collection<string, any>,
  cusActions?: object
);

export function createObservableApi(api: Function, payload: any): Function;

export function base64ToObject(b64String: String): object;

interface CreateGulpTasksConfig {
  serverDir: string;
  buildJsp: string;
  buildFolder: string;
}

export function createGulpTasks(config: CreateGulpTasksConfig): void;
