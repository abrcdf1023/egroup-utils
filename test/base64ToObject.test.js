import { Base64 } from "js-base64";
import { base64ToObject } from "../src";

const source = { foo: "bar" };
const base64 = Base64.encode(JSON.stringify(source));

it("should parse object in base64 string format to javascript object", () => {
  expect(base64ToObject(base64)).toEqual(source);
});

it("should cause syntax error", () => {
  const t = () => {
    base64ToObject(123);
  };
  expect(t).toThrow(SyntaxError);
});
