import { createObservableApi } from "../src";

it("should cause type error", () => {
  const t = () => {
    createObservableApi()
  };
  expect(t).toThrow(TypeError);
});