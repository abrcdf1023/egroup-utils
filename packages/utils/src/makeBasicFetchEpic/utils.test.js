import { findDeepValue } from './utils';

it('sholud find deep value', () => {
  const nestObj = {
    groupA: {
      foo: 'foo'
    },
    groupB: {
      bar: {
        bar: 'bar'
      }
    },
    apiA: 'apiA'
  };
  expect(findDeepValue(nestObj, 'apiA')).toEqual(nestObj.apiA);
  expect(findDeepValue(nestObj, 'groupA.foo')).toEqual(nestObj.groupA.foo);
  expect(findDeepValue(nestObj, 'groupB.bar.bar')).toEqual(
    nestObj.groupB.bar.bar
  );
});
