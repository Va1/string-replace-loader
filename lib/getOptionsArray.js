const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')

const loaderName = 'string-replace-loader'

const optionsSchema = {
  type: 'object',
  properties: {
    search: {
      type: 'string'
    },
    replace: {
      type: 'string'
    },
    flags: {
      type: 'string',
    },
    strict: {
      type: 'boolean'
    }
  },
  additionalProperties: false
}

const defaultOptions = {
  search: null,
  replace: null,
  flags: null,
  strict: false
}

function getOptionsArray (config) {
  const rawOptions = getOptions(config)
  const rawOptionsArray = (
    typeof rawOptions.multiple !== 'undefined'
      ? rawOptions.multiple
      : [rawOptions]
  )
  const optionsArray = []

  for (const optionsIndex in rawOptionsArray) {
    validateOptions(optionsSchema, rawOptionsArray[optionsIndex], loaderName)

    optionsArray[optionsIndex] = Object.assign({}, defaultOptions, rawOptionsArray[optionsIndex])
  }

  return optionsArray
}

module.exports = getOptionsArray
