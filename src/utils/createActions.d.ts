import { handleActions } from 'redux-actions'

import initialState from '../initialState'

export interface Config {
  take: string;
  request: string;
  cancel?: string;
  success: string;
  failure: string;
}

export default function createActions(
  config: Config,
  method: String,
  cusInitialState?: object,
  cusActions?: object,
)