import getIn from './getIn';

describe('getIn', () => {
  it('should get defaultValue', () => {
    const obj = {};
    const result = getIn(obj, ['foo', 'bar'], 'defaultValue');
    const result2 = getIn(obj, ['foo'], {});
    expect(result).toEqual('defaultValue');
    expect(result2).toEqual({});
  });

  it('should get value in obj', () => {
    const obj = {
      foo: {
        zpp: 'zpp',
        bar: 'bar'
      }
    };
    const result = getIn(obj, ['foo', 'zpp']);
    expect(result).toEqual('zpp');
  });

  it('should not have side effect', () => {
    const obj = {
      foo: {
        bar: {
          zoo: 'zoo'
        }
      }
    };
    const result = getIn(obj, ['foo', 'bar']);
    result.zoo = 'foo';
    expect(obj).toEqual({
      foo: {
        bar: {
          zoo: 'zoo'
        }
      }
    });
    expect(result).toEqual({
      zoo: 'foo'
    });
  });

  it('should not have side effect', () => {
    const obj = {
      foo: {
        bar: [
          {
            zoo: 'zoo'
          }
        ]
      }
    };
    const result = getIn(obj, ['foo', 'bar']);
    result[0].zoo = 'foo';
    expect(obj).toEqual({
      foo: {
        bar: [
          {
            zoo: 'zoo'
          }
        ]
      }
    });
    expect(result).toEqual([
      {
        zoo: 'foo'
      }
    ]);
  });

  it('should not do anything', () => {
    const obj = undefined;
    getIn(obj, ['foo', 'bar']);
    expect(obj).toEqual(undefined);
  });
});
