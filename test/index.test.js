var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var webpack = require('webpack');

var entryFilePath = path.join(__dirname, 'source/entry.js');
var outputDirPath = path.join(__dirname, 'build');
var outputFileName = 'build.js';
var outputFilePath = path.join(outputDirPath, outputFileName);

describe('Webpack replace loader ...', function () {

  it('should replace with string subject', function (done) {
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
              loader: '__this',
              query: {
                subject: 'var value',
                replacement: 'var v'
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
          expect(contents.indexOf('var v')).to.not.equal(-1);
          done();
        });
      }
    );
  });

  it('should replace with pattern subject', function (done) {
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
              loader: '__this',
              query: {
                subject: 'var VALUE = \'\.*\'',
                replacement: 'var v = \'\'',
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
          expect(contents.indexOf('var v = \'\'')).to.not.equal(-1);
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
              loader: '__this',
              query: {
                subject: 'var value',
                replacement: 'var v'
              }
            },
            {
              test: /bar\.js$/,
              loader: '__this',
              query: {
                subject: 'var value',
                replacement: 'var bar'
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
          expect(contents.indexOf('var v')).to.not.equal(-1);
          expect(contents.indexOf('var bar')).to.not.equal(-1);
          done();
        });
      }
    );
  });

});
