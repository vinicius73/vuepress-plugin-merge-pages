const extractPages = require('../src/extract-pages')

test('extractPages', () => {
  expect(extractPages({})).toStrictEqual([])

  const pages = [{
    _content: 'x',
    path: '/c'
  }, {
    _content: 'h',
    path: '/z/y'
  }, {
    _content: 'a',
    path: '/a/a'
  }, {
    _content: 'b',
    path: '/a/b'
  },
  {
    _content: 'c',
    path: '/b/c'
  }]

  expect(extractPages({ pages })).toStrictEqual([
    {
      content: 'a',
      path: '/a/a'
    }, {
      content: 'b',
      path: '/a/b'
    },
    {
      content: 'c',
      path: '/b/c'
    },
    {
      content: 'x',
      path: '/c'
    },
    {
      content: 'h',
      path: '/z/y'
    }
  ])
})
