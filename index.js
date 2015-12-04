var utils = require('loader-utils');

module.exports = function(source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);

  if (Array.isArray(query.replace)) {
    for (var i = 0; i < query.replace.length; i++) {
      var option = query.replace[i];

      source = source.split(option.search).join(option.replace)
    }

    return source;
  }

  if (typeof query.search !== 'undefined' && typeof query.replace !== 'undefined') {
    if (typeof query.flags !== 'undefined') {
      query.search = new RegExp(query.search, query.flags);

      return source.replace(query.search, query.replace);
    }
  }

  return source;
};
