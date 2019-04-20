import { createObservableApi } from "../src";

test("it should cause type error", () => {
  const t = () => {
    createObservableApi()
  };
  expect(t).toThrow(TypeError);
});