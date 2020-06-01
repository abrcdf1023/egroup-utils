import isTwId from './isTwId';

describe('isTwId', () => {
  it('should pass', () => {
    expect(isTwId('A123456789')).toEqual(true);
  });

  it('should not pass', () => {
    expect(isTwId('A987654321')).toEqual(false);
  });
});
