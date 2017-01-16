var utils = require('loader-utils');

function processQuery(source, query) {
  if (query.search !== undefined && query.replace !== undefined) {
    if (query.flags !== undefined) {
      query.search = new RegExp(query.search, query.flags);
    }

    source = source.replace(query.search, query.replace);
  }

  return source;
}

module.exports = function (source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);

  if (Array.isArray(query.multiple)) {
    query.multiple.forEach(function (subquery) {
      source = processQuery(source, subquery);
    });
  } else {
    source = processQuery(source, query);
  }

  return source;
};
