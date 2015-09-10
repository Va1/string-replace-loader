var utils = require('loader-utils');

module.exports = function (source) {
  var query = utils.parseQuery(this.query);

  if (typeof query.subject !== 'undefined' && typeof query.replacement !== 'undefined') {
    if (typeof query.flags !== 'undefined') {
      query.subject = new RegExp(query.subject, query.flags);
    }

    source = source.replace(query.subject, query.replacement);
  }

  return source;
};
