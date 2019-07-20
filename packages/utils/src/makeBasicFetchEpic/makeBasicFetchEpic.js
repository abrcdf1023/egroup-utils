import { ofType } from 'redux-observable';
import { throwError, of, concat } from 'rxjs';
import {
  switchMap,
  flatMap,
  catchError,
  debounceTime,
  tap
} from 'rxjs/operators';
import createObservableApi from '../createObservableApi';

export default function makeBasicFetchEpic({
  actionType,
  debounceTime: time,
  apiName,
  observableMap: customized$Map,
  fetchRequest,
  handleTakeUntil,
  handleSuccess,
  handleFailure,
  handleBeforeFetch,
  handleAfterFetch
}) {
  const observableMap = customized$Map || switchMap;
  return (action$, state$, dependencies) =>
    action$.pipe(
      ofType(actionType),
      debounceTime(time || 0),
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
            'Error: MakeBasicFetchEpic need setup apis dependencies.'
          );
        }
        return concat(
          beforeFetch,
          of(fetchRequest()),
          createObservableApi(apis[apiName], action.payload).pipe(
            flatMap(response =>
              handleSuccess(response, { state$, action, ...dependencies })
            ),
            cancelRequest,
            catchError(error => handleFailure(error, { state$, action }))
          ),
          afterFetch
        );
      })
    );
}
