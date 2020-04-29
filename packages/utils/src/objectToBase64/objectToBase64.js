import { Base64 } from 'js-base64';

/**
 * A function parse javascript Json object to base64 string.
 * @param {*} object
 */
export default function objectToBase64(object) {
  return Base64.encode(JSON.stringify(object));
}
