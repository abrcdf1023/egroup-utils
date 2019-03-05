import { Observable } from "rxjs";

/**
 * Create observable api
 * @param {Function} api the api function you want observable
 * @param {any} payload
 */
const createObservableApi = (api, payload) => {
  if (api) {
    return new Observable(observer => {
      api(payload)
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  } else {
    throw new Error(`Undefined api in createObservableApi.`);
  }
};

export default createObservableApi;
