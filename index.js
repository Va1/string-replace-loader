var utils = require('loader-utils');

module.exports = function (source) {
  var query = utils.parseQuery(this.query);

  if (typeof query.search !== 'undefined' && typeof query.replace !== 'undefined') {
    if (typeof query.flags !== 'undefined') {
      query.search = new RegExp(query.search, query.flags);
    }

    source = source.replace(query.search, query.replace);
  }

  return source;
};
