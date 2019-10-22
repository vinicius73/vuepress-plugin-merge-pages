jest.mock('../src/logger')

const { mergePage, generateFile } = require('../src/file')
const { PLUGIN_NAME } = require('../src/constants')

test('mergePage', () => {
  expect(mergePage('', { content: '# A' })).toBe('# A')
  expect(mergePage('# A', { content: '## B' }))
    .toBe('# A\n\n## B')
})

describe('generateFile', () => {
  test('default behavior', async () => {
    const context = {
      writeTemp: jest.fn(() => Promise.resolve()),
      tempPath: '/x'
    }

    const bundle = { name: 'jedi', pages: [] }

    await expect(
      generateFile(context, bundle)
    ).resolves.toBe(`/x/${PLUGIN_NAME}/jedi.md`)

    expect(context.writeTemp).toHaveBeenCalledWith(`${PLUGIN_NAME}/jedi.md`, '')
  })

  test('custom mergePages', async () => {
    const context = {
      writeTemp: jest.fn(() => Promise.resolve()),
      tempPath: '/x'
    }

    const pages = [{
      content: '# T1\nTest'
    }, {
      content: '# T2\nTest'
    }]

    const pageBreak = '<hr class="page-break" />\n\n'
    const mergePages = pages => {
      const initialValue = `# My Printable Page\n\n[[TOC]]\n${pageBreak}`
      return pages
        .reduce((acc, current) => {
          return `${acc}${current.content}\n\n${pageBreak}`
        }, initialValue)
    }

    const bundle = { name: 'jedi', pages, mergePages }

    await generateFile(context, bundle)

    const expectedResult = `# My Printable Page\n\n[[TOC]]\n${pageBreak}# T1\nTest\n\n${pageBreak}# T2\nTest\n\n${pageBreak}`

    expect(context.writeTemp).toHaveBeenCalledWith(`${PLUGIN_NAME}/jedi.md`, expectedResult)
  })
})
