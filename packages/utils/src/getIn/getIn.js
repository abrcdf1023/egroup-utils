import cloneDeep from 'lodash.clonedeep';

/**
 * get value in object
 * @param {any} obj
 * @param {Array<String>} paths
 * @param {any} defaultValue
 */
export default function getIn(obj, paths, defaultValue) {
  if (!obj) return;
  let copy = obj;
  let result;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      result = cloneDeep(copy[key]);
    } else {
      if (!copy[key]) {
        result = cloneDeep(defaultValue);
        break;
      }
      copy = copy[key];
    }
  }
  return result;
}
