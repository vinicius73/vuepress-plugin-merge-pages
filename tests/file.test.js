jest.mock('../src/logger')

const { mergePage, generateFile } = require('../src/file')
const { PLUGIN_NAME } = require('../src/constants')

describe('mergePage', () => {
  test('default behavior', () => {
    expect(mergePage('', { content: '# A' })).toBe('# A')
    expect(mergePage('# A', { content: '## B' }))
      .toBe('# A\n\n## B\n\n<hr class="page-break" />')
  })
})

test('generateFile', async () => {
  const context = {
    writeTemp: jest.fn(() => Promise.resolve()),
    tempPath: '/x'
  }

  const pages = []
  const bundle = { name: 'jedi' }

  await expect(
    generateFile(context, pages, bundle)
  ).resolves.toBe(`/x/${PLUGIN_NAME}/jedi.md`)

  expect(context.writeTemp).toHaveBeenCalledWith('vuepress-plugin-merge-md/jedi.md', '')
})
