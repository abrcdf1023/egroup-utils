import { Observable } from "rxjs";

/**
 * Create observable api
 * @param {Function} api the api function you want observable
 * @param {any} payload
 */
export default function createObservableApi(api, payload) {
  if (typeof api === 'undefined') {
    throw new TypeError('Undefined api in createObservableApi.')
  }
  return new Observable(observer => {
    api(payload)
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => observer.error(error));
  });
}