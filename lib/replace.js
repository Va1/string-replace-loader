
function replace (source, options) {
  const { replace, flags, strict } = options
  const search = (
    flags === null
      ? options.search
      : new RegExp(options.search, flags)
  )

  if (strict && (search === null || replace === null)) {
    throw new Error('Replace failed (strict mode) : options.search and options.replace are required')
  }

  const newSource = source.replace(search, replace)

  if (strict && (newSource === source)) {
    throw new Error('Replace failed (strict mode) : ' + options.search + ' → ' + options.replace)
  }

  return newSource
}

module.exports = replace
