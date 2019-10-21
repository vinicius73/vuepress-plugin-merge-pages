jest.mock('@vuepress/shared-utils', () => {
  return {
    logger: {
      warn: jest.fn(),
      prop: true
    },
    chalk: {
      yellowBright: jest.fn()
    }
  }
})

const logger = require('../src/logger')

test('logger', () => {
  logger.warn('x')
  expect(logger.prop).toBe(true)
})
