import { isImmutable } from 'immutable';

/**
 * To displayValues by schema.
 * @param {array<object>} schema Defined displayValues schema.
 * @param {object} data.value If value is undefined or empty array it'll return undefined.
 * @param {object} data.render If render function is exist it'll excute render function and return.
 * @param {function(object)} renderEach Customized render function for each element.
 */
export default function displayValues(schema, renderEach) {
  return schema.map((item, index) => {
    const plainValue = isImmutable(item.value) ? item.value.toJS() : item.value;
    const valueType = typeof plainValue;
    if (valueType === 'boolean' && !plainValue) {
      return undefined;
    }
    if (valueType === 'undefined') {
      return undefined;
    }
    const isArray = Array.isArray(plainValue);
    const isString = valueType === 'string';

    if (isArray && plainValue.filter(Boolean).length === 0) {
      return undefined;
    }
    if (isString && plainValue === '') {
      return undefined;
    }
    if (typeof item.render === 'function') {
      return item.render(item);
    }
    return renderEach(item);
  });
}
