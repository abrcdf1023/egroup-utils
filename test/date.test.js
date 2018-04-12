const { formater } = require('../date')

test('Format Date', () => {
  // default format
  // format is set to local time and Taiwan time zone is GMT + 8 so it will to be 08:00:00
  expect(formater(new Date('2015-05-05'))).toBe('2015/05/05 08:00:00')
  expect(formater('2015-05-05')).toBe('2015/05/05 08:00:00')

  // customer format
  expect(formater(new Date('2015-05-05'), 'YYYYMMDD')).toBe('20150505')
  expect(formater('2015-05-05', 'YYYY/MM/DD')).toBe('2015/05/05')

  // invalid
  expect(formater()).toBe('date is invalid')
  expect(formater(new Date('foo'))).toBe('date is invalid')
})
