const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')

const loaderName = 'string-replace-loader'

const optionsSchema = {
  type: 'object',
  properties: {
    search: {
      anyOf: [
        {
          instanceof: 'RegExp'
        },
        {
          type: 'string'
        }
      ]
    },
    replace: {
      anyOf: [
        {
          instanceof: 'Function'
        },
        {
          type: 'string'
        }
      ]
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
    validate(optionsSchema, rawOptionsArray[optionsIndex], { name: loaderName })

    optionsArray[optionsIndex] = Object.assign({}, defaultOptions, rawOptionsArray[optionsIndex])
  }

  return optionsArray
}

module.exports = getOptionsArray
