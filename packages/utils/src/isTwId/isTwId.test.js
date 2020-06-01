import isTwId from './isTwId';

describe('isTwId', () => {
  it('should pass', () => {
    expect(isTwId('A123456789')).toEqual(true);
  });

  it('should pass', () => {
    expect(isTwId('B134863148')).toEqual(true);
  });

  it('should pass', () => {
    expect(isTwId('C193753053')).toEqual(true);
  });

  it('should pass', () => {
    expect(isTwId('D172455240')).toEqual(true);
  });

  it('should not pass', () => {
    expect(isTwId('A987654321')).toEqual(false);
  });
});
