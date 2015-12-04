# Replace loader for [Webpack](http://webpack.github.io/)

Perform replacements (plain and regular expression) in the contents loaded by the loader.

## Install:

```bash
$ npm install --save-dev replace-loader
```

## Usage:

### Plain replacement:

In your `webpack.config.js`:

```javascript
module.exports = {
    // ...
    module: {
      loaders: [
        {
          test: /fileInWhichJQueryIsUndefined\.js$/,
          loader: 'string-replace',
          query: {
            search: 'jQuery',
            replace: 'window.$'
          }
        }
      ]
    }
}
```

### Regex replacement:

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
          loader: 'string-replace',
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

### Array replacement:

In your `webpack.config.js`:

```javascript
module.exports = {
    // ...
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'string-replace',
          query: {
            replace: [
               {search: 'framework', replace: 'flamewar'},
               {search: 'ants', replace: 'super ants'},
            ]
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
