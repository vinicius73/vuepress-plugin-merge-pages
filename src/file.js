const { chalk } = require('@vuepress/shared-utils')
const path = require('path')
const logger = require('./logger')
const { PLUGIN_NAME } = require('./constants')

const { green } = chalk

const mergePage = (current, { content }) => {
  return current.length === 0
    ? content
    : `${current}\n\n${content}`
}

const mergePages = pages => {
  return pages.reduce(mergePage, '')
}

const generateFile = async (context, bundle) => {
  const { name, pages } = bundle

  logger.wait('Generating:', green(`${bundle.path} => ${name}.md`))
  logger.debug(bundle)

  const content = bundle.mergePages
    ? bundle.mergePages(pages, context)
    : mergePages(pages)

  const filePath = `${PLUGIN_NAME}/${name}.md`

  await context.writeTemp(filePath, content)

  return path.join(context.tempPath, filePath)
}

module.exports = { generateFile, mergePage }
