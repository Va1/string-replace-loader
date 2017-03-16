var _ = require('lodash');
var loaderUtils = require('loader-utils');

function processQuery(source, query) {
  if (!_.isUndefined(query.search) && !_.isUndefined(query.replace)) {
    if (!_.isUndefined(query.flags)) {
      query.search = new RegExp(query.search, query.flags);
    }

    source = source.replace(query.search, query.replace);
  }

  return source;
}

module.exports = function (source) {
  if(this.cacheable) this.cacheable();

  var query = loaderUtils.getOptions(this) || {};

  if (_.isArray(query.multiple)) {
    query.multiple.forEach(function (subquery) {
      source = processQuery(source, subquery);
    });
  } else {
    source = processQuery(source, query);
  }

  return source;
};
