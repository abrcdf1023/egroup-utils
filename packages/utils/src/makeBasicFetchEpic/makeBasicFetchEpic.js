import { ofType } from 'redux-observable';
import { throwError, of, concat } from 'rxjs';
import {
  switchMap,
  flatMap,
  catchError,
  debounceTime,
  tap
} from 'rxjs/operators';
import { findDeepValue } from './utils';
import createObservableApi from '../createObservableApi';

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
}) {
  const observableMap = customized$Map || switchMap;
  const getDebounceTime = time ? debounceTime(time) : tap(val => {});
  return (action$, state$, dependencies = {}) =>
    action$.pipe(
      ofType(actionType),
      getDebounceTime,
      observableMap(action => {
        const beforeFetch = handleBeforeFetch
          ? handleBeforeFetch(action, dependencies)
          : of();
        const afterFetch = handleAfterFetch
          ? handleAfterFetch(action, dependencies)
          : of();
        const cancelRequest = handleTakeUntil
          ? handleTakeUntil(action$)
          : tap(val => {});
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
}
