var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var webpack = require('webpack');

var entryFilePath = path.join(__dirname, 'source/entry.js');
var outputDirPath = path.join(__dirname, 'build');
var outputFileName = 'build.js';
var outputFilePath = path.join(outputDirPath, outputFileName);

describe('Webpack replace loader ...', function () {
  it('should replace with string search', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: '__this-loader',
              query: {
                search: 'var value',
                replace: 'var a'
              }
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents.indexOf('var value')).to.equal(-1);
          expect(contents.indexOf('var a')).to.not.equal(-1);
          done();
        });
      }
    );
  });

  it('should replace with pattern search', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: '__this-loader',
              query: {
                search: 'var VALUE = \'\.*\'',
                replace: 'var a = \'\'',
                flags: 'i'
              }
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents.indexOf('var value')).to.equal(-1);
          expect(contents.indexOf('var a = \'\'')).to.not.equal(-1);
          done();
        });
      }
    );
  });

  it('should replace scoped', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
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
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents.indexOf('var value')).to.equal(-1);
          expect(contents.indexOf('var a')).to.not.equal(-1);
          expect(contents.indexOf('var bar')).to.not.equal(-1);
          done();
        });
      }
    );
  });

  it('should replace using multiple queries', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
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
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents.indexOf('var value')).to.equal(-1);
          expect(contents.indexOf('var a')).to.not.equal(-1);
          expect(contents.indexOf('module.exports = value')).to.equal(-1);
          expect(contents.indexOf('module.exports = a')).to.not.equal(-1);
          done();
        });
      }
    );
  });

  it('should replace using multiple queries as strings', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: [
                '__this-loader?search=var value&replace=var a',
                '__this-loader?search=module.exports = value&replace=module.exports = a'
              ]
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        fs.readFile(outputFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents.indexOf('var value')).to.equal(-1);
          expect(contents.indexOf('var a')).to.not.equal(-1);
          expect(contents.indexOf('module.exports = value')).to.equal(-1);
          expect(contents.indexOf('module.exports = a')).to.not.equal(-1);
          done();
        });
      }
    );
  });
});
