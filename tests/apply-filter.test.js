const applyFilter = require('../src/apply-filter')

test('applyFilter', () => {
  expect(applyFilter([])).toStrictEqual([])
  expect(applyFilter()).toStrictEqual([])

  expect(
    applyFilter([1, 3, 5, 6, 11, 18], pages => {
      return pages.filter(c => (c % 2) === 0)
    })
  ).toStrictEqual([6, 18])
})
