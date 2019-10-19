const { slugify, chalk } = require('@vuepress/shared-utils')
const path = require('path')
const applyFilter = require('./apply-filter')
const extractPages = require('./extract-pages')
const logger = require('./logger')
const { green } = chalk

const { PLUGIN_NAME } = require('./constants')

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

const extractBundleData = (pages, bundle) => {
  const name = bundle.name || slugify(bundle.path)
  const filtered = applyFilter(pages, bundle.filter)

  return {
    ...bundle,
    pages: filtered,
    name
  }
}

const generateBundle = async (context, pages, bundleRaw) => {
  const bundle = extractBundleData(pages, bundleRaw)
  const filePath = await generateFile(context, pages, bundle)

  return {
    ...bundle,
    filePath
  }
}

const processBundles = (context, bundles) => {
  const pages = extractPages(context)
  return Promise.all(
    bundles.map(bundle => generateBundle(context, pages, bundle))
  )
}

module.exports = { processBundles }
