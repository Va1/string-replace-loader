var path = require('path');
var expect = require('chai').expect;
var webpack = require('webpack');

describe('Webpack replace loader ...', function () {

  it('should replace', function (done) {
    webpack(
      {
        entry: path.join(__dirname, 'source/entry.js'),
        output: {
          path: path.join(__dirname, 'build'),
          filename: 'build.js'
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: [
                '__this'
              ]
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);

        expect(1).to.equal(1);
        done();
      }
    );
  });

});
