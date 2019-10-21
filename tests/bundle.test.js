jest.mock('../src/logger')

const { extractBundleData, generatePageData, processBundles } = require('../src/bundle')
const { InvalidBundleException } = require('../src/extract-pages')
const { PLUGIN_NAME } = require('../src/constants')

describe('extractBundleData', () => {
  test('name and path', () => {
    expect(extractBundleData([1], { name: 'dressrosa', path: '/arc/dressrosa' }))
      .toStrictEqual({
        pages: [1],
        name: 'dressrosa',
        path: '/arc/dressrosa'
      })
  })

  test('only path', () => {
    expect(extractBundleData([0], { path: '/arc/dressrosa' }))
      .toStrictEqual({
        pages: [0],
        name: 'arc-dressrosa',
        path: '/arc/dressrosa'
      })
  })

  test('only name', () => {
    expect(extractBundleData([0], { name: 'dressrosa' }))
      .toStrictEqual({
        pages: [0],
        name: 'dressrosa',
        path: '/dressrosa'
      })
  })

  test('filter', () => {
    const filter = pages => {
      return pages.filter(c => (c % 3) === 0)
    }
    expect(
      extractBundleData([3, 5, 9, 16, 15, 30, 21], { name: 'dressrosa', filter })
    )
      .toStrictEqual({
        filter,
        pages: [3, 9, 15, 30, 21],
        name: 'dressrosa',
        path: '/dressrosa'
      })
  })

  test('missing all', () => {
    expect(() => extractBundleData([], {}))
      .toThrow(InvalidBundleException)
  })
})

test('generatePageData', async () => {
  const context = {
    writeTemp: jest.fn(),
    tempPath: '/dbz'
  }

  await expect(generatePageData(context, [], { name: 'kakarot' }))
    .resolves
    .toStrictEqual({
      filePath: `/dbz/${PLUGIN_NAME}/kakarot.md`,
      path: '/kakarot'
    })
})

test('processBundles', async () => {
  const context = {
    writeTemp: jest.fn(),
    tempPath: '/hunter',
    pages: [{
      _content: '# Page',
      path: '/plus/ultra'
    }]
  }

  const bundles = [{
    name: 'gon'
  }, {
    name: 'kilua'
  }]

  await expect(processBundles(context, bundles))
    .resolves
    .toStrictEqual([{
      filePath: `/hunter/${PLUGIN_NAME}/gon.md`,
      path: '/gon'
    }, {
      filePath: `/hunter/${PLUGIN_NAME}/kilua.md`,
      path: '/kilua'
    }])
})
