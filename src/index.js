const { PLUGIN_NAME } = require('./constants')
const { processBundles } = require('./bundle')
const logger = require('./logger')

module.exports = (options = {}, context) => {
  return {
    name: PLUGIN_NAME,
    async additionalPages () {
      const bundles = options.bundles || []

      if (bundles.length === 0) {
        logger.warn('No bundles entered.')
        return []
      }

      return processBundles(context, bundles)
    }
  }
}
