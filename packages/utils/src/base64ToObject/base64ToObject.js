import { Base64 } from "js-base64";

/**
 * A function parse base64 string to javascript object.
 * @param {*} b64String
 */
export default function base64ToObject(b64String) {
  let value = {};
  try {
    value = JSON.parse(Base64.decode(b64String));
  } catch (error) {
    throw error;
  }
  return value;
}
