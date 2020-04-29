import { Base64 } from 'js-base64';
import objectToBase64 from './objectToBase64';

const source = { foo: 'bar' };
const base64 = Base64.encode(JSON.stringify(source));

it('should parse javascript json object to base64 string format', () => {
  expect(objectToBase64(source)).toEqual(base64);
});
