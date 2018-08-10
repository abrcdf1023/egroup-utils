import makeFetchActions from './makeFetchActions'

/**
 * Create process to handle all type of fetch actions
 * 
 * @private
 * @param {Object} arg
 * @return {Object}
 */
export default function createActions(arg) {
  return {
    get: makeFetchActions(arg.get, 'GET'),
    post: makeFetchActions(arg.post, 'POST'),
    patch: makeFetchActions(arg.patch, 'PATCH'),
    delete: makeFetchActions(arg.delete, 'DELETE'),
  }
}
