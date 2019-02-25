import checkConfig from './checkConfig'
import makeTakeAction from './makeTakeAction'
import makeRequestAction from './makeRequestAction'
import makeSuccessAction from './makeSuccessAction'
import makeCancelAction from './makeCancelAction'
import makeFailureAction from './makeFailureAction'

/**
 * To handle process of fetch actions
 * @private
 * @param {Object|null} config
 * @return {Object}
 */
export default function makeFetchActions(config) {
  if (!config) return {}
  const { take, request, success, cancel, failure } = config
  checkConfig(config)
  return {
    ...makeTakeAction(take),
    ...makeRequestAction(request),
    ...makeSuccessAction(success),
    ...makeCancelAction(cancel),
    ...makeFailureAction(failure),
  }
}