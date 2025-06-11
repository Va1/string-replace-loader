const getOptionsArr = require('./getOptionsArr')
const replace = require('./replace')

const loaderName = 'string-replace-loader'

function loader (source, map) {
  this.cacheable()

  const optionsArr = getOptionsArr(loaderName, this)

  let newSource = source
  for (const options of optionsArr) {
    newSource = replace(newSource, options, this)
  }

  this.callback(null, newSource, map)
}

module.exports = loader
