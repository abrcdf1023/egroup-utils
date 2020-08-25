import { ActionFunctionAny, Action } from 'redux-actions';
import {
  ofType,
  ActionsObservable,
  StateObservable,
  Epic
} from 'redux-observable';
import {
  throwError,
  of,
  concat,
  Observable,
  ObservableInput,
  OperatorFunction
} from 'rxjs';
import {
  mergeMap,
  switchMap,
  flatMap,
  catchError,
  debounceTime,
  tap
} from 'rxjs/operators';
import { findDeepValue } from './utils';
import createObservableApi from '../createObservableApi';

export type ObservableAction = ActionsObservable<Action<any>>;
export type ObservableState = StateObservable<any>;

export interface Dependencies {
  apiErrorsHandler?: () => {};
  action?: Action<any>;
  apis?: any;
  schema?: any;
}
export interface Options extends Dependencies {
  action$: ObservableAction;
  state$: ObservableState;
}

export interface MakeBasicFetchEpicOptions {
  actionType: string;
  apiName: string;
  fetchRequest: ActionFunctionAny<Action<any>>;
  handleSuccess: (response: any, options: Options) => ObservableInput<any>;
  handleFailure: (error: any, options: Options) => ObservableInput<any>;
  debounceTime?: number;
  observableMap?: typeof switchMap | typeof mergeMap;
  handleTakeUntil?: <T>(action$: ObservableAction) => OperatorFunction<T, any>;
  handleBeforeFetch?: <T>(
    action: Action<any>,
    dependencies: Dependencies
  ) => Observable<T>;
  handleAfterFetch?: <T>(
    action: Action<any>,
    dependencies: Dependencies
  ) => Observable<T>;
}

export default function makeBasicFetchEpic({
  actionType,
  apiName,
  fetchRequest,
  handleSuccess,
  handleFailure,
  debounceTime: time,
  observableMap: customized$Map,
  handleTakeUntil,
  handleBeforeFetch,
  handleAfterFetch
}: MakeBasicFetchEpicOptions) {
  const observableMap = customized$Map || switchMap;
  const getDebounceTime = time ? debounceTime(time) : tap(() => {});
  const basicFetchEpic: Epic = (
    action$: ObservableAction,
    state$: ObservableState,
    dependencies: Dependencies = {}
  ) =>
    action$.pipe(
      ofType(actionType),
      getDebounceTime,
      observableMap((action: Action<any>) => {
        const beforeFetch = handleBeforeFetch
          ? handleBeforeFetch(action, dependencies)
          : of();
        const afterFetch = handleAfterFetch
          ? handleAfterFetch(action, dependencies)
          : of();
        const cancelRequest = handleTakeUntil
          ? handleTakeUntil(action$)
          : tap(() => {});
        // we can concat observable actions
        // see this comment https://github.com/redux-observable/redux-observable/issues/62#issuecomment-266337873
        const { apis } = dependencies;
        if (!apis) {
          return throwError(
            'Error: makeBasicFetchEpic need setup apis dependency.'
          );
        }
        const api = findDeepValue(apis, apiName);
        let apiPayload = action.payload;
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          !Array.isArray(action.payload)
        ) {
          // Destructuring `callback` automatically it's used to execute method after api finish.
          const { callback, ...payload } = action.payload;
          apiPayload = payload;
        }
        return concat(
          beforeFetch,
          of(fetchRequest()),
          createObservableApi(api(apiPayload)).pipe(
            flatMap(response =>
              handleSuccess(response, {
                action$,
                state$,
                action,
                ...dependencies
              })
            ),
            cancelRequest,
            catchError(error =>
              handleFailure(error, { action$, state$, action, ...dependencies })
            )
          ),
          afterFetch
        );
      })
    );
  return basicFetchEpic;
}