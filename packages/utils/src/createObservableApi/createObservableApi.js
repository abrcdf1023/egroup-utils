import { Observable, isObservable } from 'rxjs';

/**
 * Create observable api
 * @param {Function} api the api function you want observable
 * @param {any} payload
 */
export default function createObservableApi(api) {
  if (typeof api === 'undefined') {
    throw new TypeError('Undefined api in createObservableApi.');
  }
  if (isObservable(api)) {
    return api;
  }
  return new Observable(observer => {
    api
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => observer.error(error));
  });
}
