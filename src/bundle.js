const { slugify, ensureLeadingSlash } = require('@vuepress/shared-utils')
const applyFilter = require('./apply-filter')
const extractPages = require('./extract-pages')
const { generateFile } = require('./file')
const { InvalidBundleException } = require('./extract-pages')

const assertBundle = bundle => {
  if (!bundle.name && !bundle.path) {
    throw new InvalidBundleException('Bundle need path or name option')
  }
}

const parsePathAndName = bundle => {
  assertBundle(bundle) // ! exception

  const name = bundle.name || slugify(bundle.path)
  const path = ensureLeadingSlash(bundle.path || slugify(bundle.name))

  return { name, path }
}

const extractBundleData = (pages, bundle) => {
  const { name, path } = parsePathAndName(bundle)
  const filtered = applyFilter(pages, bundle.filter)

  return {
    ...bundle,
    pages: filtered,
    path,
    name
  }
}

const generatePageData = async (context, pages, bundleRaw) => {
  const bundle = extractBundleData(pages, bundleRaw)
  const filePath = await generateFile(context, bundle)

  return {
    path: bundle.path,
    filePath
  }
}

const processBundles = (context, bundles) => {
  const pages = extractPages(context)
  return Promise.all(
    bundles.map(bundle => generatePageData(context, pages, bundle))
  )
}

module.exports = { processBundles, generatePageData, extractBundleData }
