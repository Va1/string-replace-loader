var utils = require('loader-utils');

function processQuery(source, option) {
  if (typeof option.search !== 'undefined' && typeof option.replace !== 'undefined') {
    return source.split(option.search).join(option.replace);
  }

  return source;
}

module.exports = function(source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);

  if (Array.isArray(query.multiple)) {
    var length = query.multiple.length;

    for (var i = 0; i < length; i++) {
      var option = query.multiple[i];
      source = processQuery(source, option);
    }

    return source;
  }

  return processQuery(source, query);
};
