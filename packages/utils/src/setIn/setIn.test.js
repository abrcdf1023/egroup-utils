import setIn from './setIn';

describe('setIn', () => {
  it('should set value in obj', () => {
    const obj = {};
    setIn(obj, ['foo', 'bar'], 'value');
    expect(obj).toEqual({
      foo: {
        bar: 'value'
      }
    });
  });

  it('should set value in obj', () => {
    const obj = {
      foo: {
        zoo: 'zoo'
      }
    };
    setIn(obj, ['foo', 'bar'], 'value');
    expect(obj).toEqual({
      foo: {
        zoo: 'zoo',
        bar: 'value'
      }
    });
  });

  it('should not do anything', () => {
    const obj = undefined;
    setIn(obj, ['foo', 'bar'], 'value');
    expect(obj).toEqual(undefined);
  });
});
