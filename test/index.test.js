var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var webpack = require('webpack');

var entryFilePath = path.join(__dirname, 'source/entry.js');
var outputDirPath = path.join(__dirname, 'build');
var outputFileName = 'build.js';
var outputFilePath = path.join(outputDirPath, outputFileName);

function getTestWebPackConfig(loader) {
  return {
    entry: entryFilePath,
    output: {
      path: outputDirPath,
      filename: outputFileName
    },
    module: {
      loaders: [
        loader
      ]
    }
  }
}

describe('Webpack replace loader ...', function () {
  it('should replace with string search', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'var value',
          replace: 'var a'
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('var value');
          expect(contents).is.include('var a');
          done();
        });
      }
    );
  });

  it('should replace with pattern search', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'var VALUE = \'\.*\'',
          replace: 'var a = \'\'',
          flags: 'i'
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('var value');
          expect(contents).is.include('var a = \'\'');
          done();
        });
      }
    );
  });

  it('should replace scoped', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'var value',
          replace: 'var a'
        }
      },
      {
        test: /bar\.js$/,
        loader: '__this-loader',
        query: {
          search: 'var value',
          replace: 'var bar'
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('var value');
          expect(contents).is.include('var a');
          expect(contents).is.include('var bar');
          done();
        });
      }
    );
  });

  it('should replace using multiple queries', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          multiple: [
            {
              search: 'var value',
              replace: 'var a'
            },
            {
              search: 'module.exports = value',
              replace: 'module.exports = a'
            }
          ]
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('var value');
          expect(contents).is.include('var a');
          expect(contents).is.not.include('module.exports = value');
          expect(contents).is.include('module.exports = a');
          done();
        });
      }
    );
  });

  it('should replace using multiple queries as strings', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loaders: [
          '__this-loader?search=var value&replace=var a',
          '__this-loader?search=module.exports = value&replace=module.exports = a'
        ]
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('var value');
          expect(contents).is.include('var a');
          expect(contents).is.not.include('module.exports = value');
          expect(contents).is.include('module.exports = a');
          done();
        });
      }
    );
  });

  it('should not throw error when cannot replace in single mode', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'unexisting value',
          replace: 'var a'
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).is.not.include('Cannot replace unexisting value → var a');
          done();
        });
      }
    );
  });

  it('should not throw error when cannot replace in single mode and strict is object', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'unexisting value',
          replace: 'var a',
          strict: 'some string'
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).is.not.include('Cannot replace unexisting value → var a');
          done();
        });
      }
    );
  });

  it('should not throw error when cannot replace in multiple mode', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          multiple: [
            {
              search: 'unexisting value',
              replace: 'var a',
              strict: false
            }
          ],
          strict: true
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.not.include('Cannot replace unexisting value → var a');
          done();
        });
      }
    );
  });

  it('should throw error when cannot replace in single strict mode', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          search: 'unexisting value',
          replace: 'var a',
          strict: true
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('Cannot replace unexisting value → var a');
          done();
        });
      }
    );
  });

  it('should throw error when cannot replace in multiple strict mode', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          multiple: [
            {
              search: 'unexisting value',
              replace: 'var a'
            }
          ],
          strict: true
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('Cannot replace unexisting value → var a');
          done();
        });
      }
    );
  });

  it('should throw error when search is not defined in strict mode', function (done) {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        query: {
          multiple: [
            {
              replace: 'var a'
            }
          ],
          strict: true
        }
      }),
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('Cannot replace: search option is not defined');
          done();
        });
      }
    );
  });
});
