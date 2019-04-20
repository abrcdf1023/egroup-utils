import { Base64 } from "js-base64";
import { base64ToObject } from "../src";

const source = { foo: "bar" };
const base64 = Base64.encode(JSON.stringify(source));

test("base64 object to js object", () => {
  expect(base64ToObject(base64)).toEqual(source);
});
