const { dateFormater, timeCompare } = require('../time')

test('Format Date', () => {
  // default format
  // format is set to local time and Taiwan time zone is GMT + 8 so it will to be 08:00:00
  expect(dateFormater(new Date('2015-05-05'))).toBe('2015/05/05 08:00:00')
  expect(dateFormater('2015-05-05')).toBe('2015/05/05 08:00:00')

  // customer format
  expect(dateFormater(new Date('2015-05-05'), 'YYYYMMDD')).toBe('20150505')
  expect(dateFormater('2015-05-05', 'YYYY/MM/DD')).toBe('2015/05/05')

  // invalid
  expect(dateFormater()).toBe('date is invalid')
  expect(dateFormater(new Date('foo'))).toBe('date is invalid')
})

test('Compare Time', () => {
  const time1 = '2015-05-05T00:00:00Z'
  const time2 = '2015-05-05T10:10:30Z'
  const time3 = '2015-05-05T00:10:30Z'
  const time4 = '2015-05-05T00:00:10.55Z'
  const time5 = '2015-05-06T10:10:30Z'
  expect(timeCompare(new Date(time1), new Date(time2))).toBe('10 hours')
  expect(timeCompare(new Date(time1), new Date(time2))).toBe('10 hours')
  expect(timeCompare(new Date(time1), new Date(time3))).toBe('10 mins')
  expect(timeCompare(new Date(time1), new Date(time4))).toBe('10 seconds')
  expect(timeCompare(new Date(time1), new Date(time5))).toBe('yesterday')
})
