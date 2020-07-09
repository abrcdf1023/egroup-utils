import { Observable, OperatorFunction } from 'rxjs';
import { ActionFunctionAny, Action } from 'redux-actions';
import { ActionsObservable, StateObservable, Epic } from 'redux-observable';

export interface Options<D = any> {
  action$: ActionsObservable;
  state$: StateObservable;
  apiErrorsHandler?: D;
  action?: D;
  apis?: D;
  schema?: D;
}
export interface MakeBasicFetchEpicOptions {
  actionType: string;
  apiName: string;
  fetchRequest: ActionFunctionAny<Action<any>>;
  handleSuccess: (response: any, options: Options) => void;
  handleFailure: (error: any, options: Options) => void;
  debounceTime?: number;
  observableMap?: OperatorFunction;
  handleTakeUntil?: OperatorFunction;
  handleBeforeFetch?: (action: Action<any>, dependencies: any) => Observable;
  handleAfterFetch?: (action: Action<any>, dependencies: any) => Observable;
}

export default function makeBasicFetchEpic(
  options: MakeBasicFetchEpicOptions
): Epic;
