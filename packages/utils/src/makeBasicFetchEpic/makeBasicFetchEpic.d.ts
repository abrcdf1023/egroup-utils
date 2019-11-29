import { Observable, OperatorFunction } from 'rxjs';
import { ActionFunctionAny, Action } from 'redux-actions';
import { ActionsObservable, StateObservable } from 'redux-observable';

export interface Options<D = any> {
  action$: ActionsObservable;
  state$: StateObservable;
  apis?: D;
  schema?: D;
}

export type FunctionHandleSuccess = (response: any, options: Options) => number;
export type FunctionHandleFailure = (error: any, options: Options) => number;

export default function makeBasicFetchEpic(
  actionType: string,
  apiName: string,
  fetchRequest: ActionFunctionAny<Action<any>>,
  handleSuccess: FunctionHandleSuccess,
  handleFailure: FunctionHandleFailure,
  debounceTime?: number,
  observableMap?: OperatorFunction,
  handleTakeUntil?: OperatorFunction,
  handleBeforeFetch?: Observable,
  handleAfterFetch?: Observable
);
