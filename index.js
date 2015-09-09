var _ = require('lodash');
var utils = require('loader-utils');

module.exports = function (source) {
  var query = utils.parseQuery(this.query);
  var subject = query['subject'];
  var replacement = query['replacement'];
  var flags = query['flags'];

  if (_.isString(subject) && _.isString(replacement)) {
    if (_.isString(flags)) {
      subject = new RegExp(subject, flags);
    }

    source = source.replace(subject, replacement);
  }

  return source;
};
