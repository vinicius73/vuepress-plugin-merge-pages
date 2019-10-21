const { chalk } = require('@vuepress/shared-utils')
const path = require('path')
const logger = require('./logger')
const { PLUGIN_NAME } = require('./constants')

const { green } = chalk

const mergePage = (current, { content }) => {
  return current.length === 0
    ? content
    : `${current}\n\n${content}\n\n<hr class="page-break" />`
}

const generateFile = async (context, pages, bundle) => {
  const { name } = bundle

  logger.wait('Generating:', green(`${bundle.path} => ${name}.md`))
  logger.debug(bundle)

  const content = pages.reduce(mergePage, '')

  const filePath = `${PLUGIN_NAME}/${name}.md`

  await context.writeTemp(filePath, content)

  return path.join(context.tempPath, filePath)
}

module.exports = { generateFile, mergePage }
