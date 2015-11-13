var utils = require('loader-utils');

module.exports = function(source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);
  for (var i = 0; i < query.replace.length; i++) {
    var option = query.replace[i];

    source = source.split(option.search).join(option.replace)
  }

  return source;
};
