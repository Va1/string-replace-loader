# Replace loader for [Webpack](http://webpack.github.io/)

Perform replacements (plain and regular expression) in the contents loaded by the loader.

## Install:

```bash
$ npm install --save-dev string-replace-loader
```

With release of 2.0.0 the loader is expected to be used in Node v4+ environment.
Support for Node v3 and lower was dropped, but you can install and use the loader version of 1.3.0 in older environments. 

## Usage:

In general, loader allows to perform replacements in a way [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) does (loader uses it internally).
For instance, it means that if you want to replace all occurrences, you should use RegExp-like string in `query.search` with `g` flag in `query.flags`, etc.

### Plain replacement:

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    loaders: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'jQuery',
          replace: 'window.$'
        }
      }
    ]
  }
}
```

### RegEx replacement:

To achieve regular expression replacement you should specify the `flags` query param
(as an empty string if you do not want any flags). In this case, `search` and `flags` are being
passed to the [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    loaders: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'jquery',
          replace: 'window.$',
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
    loaders: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        query: {
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

### Strict mode replacement:

You can set strict mode to ensure that the replacement was done:

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    loaders: [
      {
        test: /fileInWhichJQueryIsUndefined\.js$/,
        loader: 'string-replace-loader',
        query: {
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
