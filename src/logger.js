const { logger, chalk } = require('@vuepress/shared-utils')
const { yellowBright } = chalk

function isFunction (fn) {
  return fn && {}.toString.call(fn) === '[object Function]'
}

const wrap = fn => {
  return (...args) => {
    return fn(yellowBright('[Merge Pages]'), ...args)
  }
}

module.exports = new Proxy({}, {
  get (target, prop) {
    const value = logger[prop]

    return isFunction(value)
      ? wrap(value.bind(logger))
      : value
  }
})
