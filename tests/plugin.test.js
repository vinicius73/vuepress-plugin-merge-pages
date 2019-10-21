jest.mock('../src/logger')

const plugin = require('../src/index')
const { PLUGIN_NAME } = require('../src/constants')

describe('vuepress-plugin-merge-md', () => {
  test('empty bundle', async () => {
    const context = {
      writeTemp: jest.fn(),
      tempPath: '/hunter',
      pages: [{
        _content: '# Page',
        path: '/plus/ultra'
      }]
    }

    const instance = plugin({}, context)

    expect(instance.name).toBe(PLUGIN_NAME)

    await expect(instance.additionalPages())
      .resolves
      .toStrictEqual([])
  })

  test('default behavor', async () => {
    const context = {
      writeTemp: jest.fn(),
      tempPath: '/hunter',
      pages: [{
        _content: '# Page',
        path: '/plus/ultra'
      }]
    }

    const options = {
      bundles: [{
        name: 'all-might',
        path: 'all/for/one'
      }]
    }

    const instance = plugin(options, context)

    await expect(instance.additionalPages())
      .resolves
      .toStrictEqual([{
        filePath: `/hunter/${PLUGIN_NAME}/all-might.md`,
        path: '/all/for/one'
      }])
  })
})
