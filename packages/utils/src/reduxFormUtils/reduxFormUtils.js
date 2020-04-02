import { fromJS, List, isImmutable, Map } from 'immutable';

/**
 * Make react select redux form formatter.
 * @param {*} options
 * @param {array} options.labelPath
 * @param {array} options.valuePath
 */
export function makeReactSelectFormatter(options) {
  const { labelPath = ['label'], valuePath = ['value'] } = options;
  return function formatter(value, name) {
    if (typeof value === 'string' || typeof value === 'number') {
      return fromJS({
        label: value,
        value
      });
    }
    if (Map.isMap(value)) {
      return fromJS({
        label: value.getIn(labelPath),
        value: value.getIn(valuePath)
      });
    }
    if (List.isList(value)) {
      return value.map(el => {
        if (typeof el === 'string' || typeof el === 'number') {
          return fromJS({
            label: el,
            value: el
          });
        }
        return fromJS({
          label: el.getIn(labelPath),
          value: el.getIn(valuePath)
        });
      });
    }
    return value;
  };
}

/**
 * Make react select redux form normalizer.
 * @param {*} options
 * @param {array} options.valuePath
 */
export function makeReactSelectNormalizer(options) {
  const { valuePath = ['value'] } = options;
  return function normalizer(
    value,
    previousValue,
    allValues,
    previousAllValues,
    name
  ) {
    if (isImmutable(value)) {
      if (Map.isMap(value)) {
        return value.getIn(valuePath);
      }
      if (List.isList(value)) {
        return value.map(el => el.getIn(valuePath));
      }
    }
    return value;
  };
}
