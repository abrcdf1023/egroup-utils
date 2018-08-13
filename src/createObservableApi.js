import { Observable } from 'rxjs'

/**
 * Create observable api
 * @param {any} payload
 * @param {Function} api observable api function
 */
const createObservableApi = (payload, api) => new Observable((observer) => {
  api(payload).then((response) => {
    observer.next(response)
    observer.complete()
  }).catch(error => observer.error(error))
})

export default createObservableApi
