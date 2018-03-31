const { objectToQueryString } = require('../async')

test('Object To QueryString', () => {
  expect(objectToQueryString({
    foo: 'foo',
    bar: 'bar'
  })).toBe('?foo=foo&bar=bar')
})

test('Object To QueryString Exception', () => {
  expect(objectToQueryString()).toBe('')
})
