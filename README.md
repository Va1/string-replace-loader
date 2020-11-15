# Replace loader for [Webpack](http://webpack.github.io/)

Perform replacements (plain and regular expression) in the contents loaded by the loader.

## Install:

```bash
$ yarn add --dev string-replace-loader
```

With release of 2.0.0 the loader is expected to be used in Node v4+ environment.
Support for Node v3 and lower was dropped, but you can install and use the loader version of 1.3.0 in older environments.

With release of 3.0.0 the loader is expected to be used with Webpack v5+.
Support for Webpack v4 and lower was dropped, but you can install and use the loader version of 2.3.0 in older environments.

## Usage:

Loader allows to perform replacements in a way [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) does (loader uses it internally).
It means that if you want to replace all occurrences, you should use RegExp-like string in `options.search` with `g` flag in `options.flags`, etc.

### Plain replacement:

Plain string replacement, no need to escape RegEx special characters.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '$',
          replace: 'window.jQuery',
        }
      }
    ]
  }
}
```

### RegEx replacement:

To achieve regular expression replacement you should either specify the `search` option as
[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) instance,
either specify it as string and add the `flags` option (as an empty string if you do not want any flags).
In the latter case, `search` and `flags` are being passed to the
[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor
and this means that you should escape RegEx special characters in `search` if you want it to be replaced as a string.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: /\$/i,
          replace: 'window.jQuery'
        }
      }
    ]
  }
}
```
or
```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '\$',
          replace: 'window.jQuery',
          flags: 'i'
        }
      }
    ]
  }
}
```

### Multiple replacement:

Also, you can pass an array of search-replace pairs this way:

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
             { search: 'jQuery', replace: 'window.$' },
             { search: '_', replace: 'window.lodash' }
          ]
        }
      }
    ]
  }
}
```

### Callback replacement

You can specify a callback function to have dynamic replacement values.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '^Hello, (.*)!$',
          replace: (match, p1, offset, string) => `Bonjour, ${p1.toUpperCase()}!`,
          flags: 'g'
        }
      }
    ]
  }
}
```

### Strict mode replacement:

You can enable strict mode to ensure that the replacement was performed.
Loader will throw exception if nothing was replaced or if `search` or `replace` options were not specified.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'jQuery',
          replace: 'window.$',
          strict: true
        }
      }
    ]
  }
}
```

## Contributing:

Feel free to open issues to propose stuff and participate. Pull requests are also welcome.

## Licence:

[MIT](http://en.wikipedia.org/wiki/MIT_License)
