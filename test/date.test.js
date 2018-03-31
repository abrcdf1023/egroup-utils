const { formater } = require('../date')

test('Format Date', () => {
  expect(formater(new Date('2015-05-05'), 'yyyy-mm-dd')).toBe('2015-05-05')
})

test('Format Date 2', () => {
  expect(formater(new Date('2015-05-05'))).toBe('2015/05/05')
})

test('Format Date Exception', () => {
  expect(formater()).toBe('')
})

test('Format Date Exception2', () => {
  expect(formater(new Date('foo'))).toBe('NaN/NaN/NaN')
})

