const { objectToQueryString } = require('../async')

test('Object To QueryString Exception', () => {
  expect(objectToQueryString({
    foo: 'foo',
    bar: 'bar'
  })).toBe('?foo=foo&bar=bar')
  expect(objectToQueryString()).toBe('')
  expect(objectToQueryString({})).toBe('')
})
