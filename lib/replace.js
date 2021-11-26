
function replace (source, options, context) {
  const { flags, strict } = options

  let search
  if (options.search instanceof RegExp) {
    // if the `search` type is RegExp, we ignore `flags`
    search = options.search
  } else if (flags !== null) {
    search = new RegExp(options.search, flags)
  } else {
    search = options.search
  }

  let replace
  if (typeof options.replace === 'function') {
    replace = options.replace.bind(context)
  } else {
    replace = options.replace
  }

  if (strict && (typeof search === 'undefined' || search === null || typeof replace === 'undefined' || replace === null)) {
    throw new Error('Replace failed (strict mode) : options.search and options.replace are required')
  }

  const newSource = source.replace(search, replace)

  if (strict && (newSource === source)) {
    throw new Error('Replace failed (strict mode) : ' + options.search + ' → ' + options.replace)
  }

  return newSource
}

module.exports = replace
