var utils = require('loader-utils');

module.exports = function (source) {
  this.cacheable();
  var query = utils.parseQuery(this.query);

  if (typeof query.search !== 'undefined' && typeof query.replace !== 'undefined') {
    for(var i = 0; i < query.length; i++){
      var option = query[i];

      source = source.replace(option.search, option.replace);
    }
  }

  return source;
};
