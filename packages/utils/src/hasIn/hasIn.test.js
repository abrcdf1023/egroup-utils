import hasIn from './hasIn';

describe('hasIn', () => {
  it('should know does value has in object.', () => {
    const obj = {
      foo: {
        bar: 'bar'
      }
    };
    expect(obj).toEqual(obj);
    expect(hasIn(obj, ['foo', 'bar'])).toEqual(true);
  });

  it('should know does value has in object.', () => {
    const obj = {
      foo: {}
    };
    expect(obj).toEqual(obj);
    expect(hasIn(obj, ['foo', 'bar'])).toEqual(false);
  });
});
