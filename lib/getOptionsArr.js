const { validate } = require('schema-utils')

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
      type: 'string'
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

function getOptionsArr (loaderName, context) {
  const rawOptions = context.getOptions()
  const rawOptionsArr = (
    typeof rawOptions.multiple !== 'undefined'
      ? rawOptions.multiple
      : [rawOptions]
  )
  const optionsArr = []

  for (const rawOptionsIdx in rawOptionsArr) {
    const rawOptions = rawOptionsArr[rawOptionsIdx]

    validate(optionsSchema, rawOptions, { name: loaderName })

    optionsArr[rawOptionsIdx] = Object.assign({}, defaultOptions, rawOptions)
  }

  return optionsArr
}

module.exports = getOptionsArr
