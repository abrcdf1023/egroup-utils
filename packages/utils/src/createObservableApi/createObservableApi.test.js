import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { catchError } from "rxjs/operators";
import createObservableApi from "./createObservableApi";
import { of } from "rxjs";

const response = {
  data: ["a", "b", "c"]
};

const mock = new MockAdapter(axios);

const fakeApi = payload => axios.get("/data");

it("should has response", done => {
  mock.onGet("/data").reply(200, response);
  const $api = createObservableApi(fakeApi);
  $api.subscribe(
    res => {
      expect(res.data).toEqual(response);
    },
    null,
    done
  );
});

it("should has api error", done => {
  mock.onGet("/data").networkError();
  const $api = createObservableApi(fakeApi);
  $api.pipe(catchError(error => of(error))).subscribe(
    error => {
      const t = () => {
        throw error;
      };
      expect(t).toThrow(Error);
    },
    null,
    done
  );
});

it("should cause type error", () => {
  const t = () => {
    createObservableApi();
  };
  expect(t).toThrow(TypeError);
});
