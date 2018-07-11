import { Observable } from 'rxjs'

/**
 * Create observable api
 * @param {any} payload
 * @param {string} apiName
 */
const createObservableApi = (payload, api) => new Observable(async (observer) => {
  const response = await api(payload).catch(err => observer.error(err))
  observer.next(response)
  observer.complete()
})

export default createObservableApi
