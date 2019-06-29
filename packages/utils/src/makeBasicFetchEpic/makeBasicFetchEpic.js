import { ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
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
  return (action$, state$, { apis, schema }) =>
    action$.pipe(
      ofType(actionType),
      debounceTime(time || 0),
      observableMap(action => {
        const beforeFetch = handleBeforeFetch
          ? handleBeforeFetch(action, { apis, schema })
          : of();
        const afterFetch = handleAfterFetch
          ? handleAfterFetch(action, { apis, schema })
          : of();
        const cancelRequest = handleTakeUntil
          ? handleTakeUntil(action$)
          : tap(val => {});
        // we can concat observable actions
        // see this comment https://github.com/redux-observable/redux-observable/issues/62#issuecomment-266337873
        return concat(
          beforeFetch,
          of(fetchRequest()),
          createObservableApi(apis[apiName], action.payload).pipe(
            flatMap(response =>
              handleSuccess(response, { state$, action, apis, schema })
            ),
            cancelRequest,
            catchError(error => handleFailure(error, { state$, action }))
          ),
          afterFetch
        );
      })
    );
}
