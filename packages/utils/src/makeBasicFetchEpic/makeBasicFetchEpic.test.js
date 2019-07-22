import { TestScheduler } from 'rxjs/testing';
import { of, concat } from 'rxjs';
import { createAction } from 'redux-actions';

import makeBasicFetchEpic from './makeBasicFetchEpic';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});
/**
 * Create a fetchEpic
 */
const FETCH_GET_USER = 'FETCH_GET_USER';
const FETCH_GET_USER_REQUEST = 'FETCH_GET_USER_REQUEST';
const FETCH_GET_USER_SUCCESS = 'FETCH_GET_USER_SUCCESS';
const FETCH_GET_USER_FAILURE = 'FETCH_GET_USER_FAILURE';

const fetchGetUser = createAction(FETCH_GET_USER);
const fetchGetUserRequest = createAction(FETCH_GET_USER_REQUEST);
const fetchGetUserSuccess = createAction(FETCH_GET_USER_SUCCESS);
const fetchGetUserFailure = createAction(FETCH_GET_USER_FAILURE);

const fetchGetUserEpic = makeBasicFetchEpic({
  actionType: FETCH_GET_USER,
  apiName: 'fetchGetUser',
  fetchRequest: fetchGetUserRequest,
  handleSuccess: response => [fetchGetUserSuccess(response.data)],
  handleFailure: (error, { state$, action }) =>
    concat(of(fetchGetUserFailure(error)))
});

it('sholud create a basic fetch epic', () => {
  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('-a', {
      a: fetchGetUser({
        id: 10
      })
    });
    const state$ = null;
    const response = {
      status: 200,
      data: ['a', 'b', 'c']
    };
    const dependencies = {
      apis: {
        fetchGetUser: ({ id }) =>
          cold('-a', {
            a: response
          })
      }
    };

    const output$ = fetchGetUserEpic(action$, state$, dependencies);
    const expectedMarble = '-ab';
    const expectedValues = {
      a: {
        type: FETCH_GET_USER_REQUEST
      },
      b: {
        type: FETCH_GET_USER_SUCCESS,
        payload: response.data
      }
    };

    expectObservable(output$).toBe(expectedMarble, expectedValues);
  });
});
