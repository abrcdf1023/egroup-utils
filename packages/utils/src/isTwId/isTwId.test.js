import isTwId from './isTwId';

describe('isTwId', () => {
  it('should pass with TW Id', () => {
    expect(isTwId('A123456789')).toEqual(true);
  });

  it('should pass with TW Id', () => {
    expect(isTwId('B134863148')).toEqual(true);
  });

  it('should pass with TW Id', () => {
    expect(isTwId('C193753053')).toEqual(true);
  });

  it('should pass with TW Id', () => {
    expect(isTwId('D172455240')).toEqual(true);
  });

  it('should not pass with TW Id', () => {
    expect(isTwId('A987654321')).toEqual(false);
  });

  it('should pass with TW resident permit Id', () => {
    expect(isTwId('AC82420552')).toEqual(true);
  });

  it('should pass with TW resident permit Id', () => {
    expect(isTwId('AD34096702')).toEqual(true);
  });

  it('should pass with TW resident permit Id', () => {
    expect(isTwId('AA14250777')).toEqual(true);
  });

  it('should pass with TW resident permit Id', () => {
    expect(isTwId('AB64839220')).toEqual(true);
  });

  it('should not pass with TW resident permit Id', () => {
    expect(isTwId('AE87654321')).toEqual(false);
  });

  it('should not pass with TW resident permit Id', () => {
    expect(isTwId('AA12345678')).toEqual(false);
  });
});
