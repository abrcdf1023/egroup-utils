import { Observable } from 'rxjs'

/**
 * Create observable api
 * @param {Function} api the api function you want observable
 * @param {any} payload
 */
const createObservableApi = (api, payload) => new Observable((observer) => {
  api(payload).then((response) => {
    observer.next(response)
    observer.complete()
  }).catch(error => observer.error(error))
})

export default createObservableApi
