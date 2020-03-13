import { fromJS, List, isImmutable } from 'immutable';

export function makeFormatSingleSelect(options) {
  return function formatSingleSelect(value, name) {
    if (typeof value === 'string' || typeof value === 'number') {
      return fromJS(options.filter(el => el.value === value)[0]);
    }
    return value;
  };
}

export function formatSingleSelect(value, name) {
  if (typeof value === 'string' || typeof value === 'number') {
    return fromJS({
      label: value,
      value
    });
  }
  return value;
}

export function formatMultiSelect(value, name) {
  if (List.isList(value)) {
    return value.map(el =>
      fromJS({
        label: el,
        value: el
      })
    );
  }
  return value;
}

export function normalizeSingleSelect(
  value,
  previousValue,
  allValues,
  previousAllValues,
  name
) {
  if (isImmutable(value)) return value.get('value');
  return value;
}

export function normalizeMultiSelect(
  value,
  previousValue,
  allValues,
  previousAllValues,
  name
) {
  if (isImmutable(value)) return value.map(el => el.get('value'));
  return value;
}
