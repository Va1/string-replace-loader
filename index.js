var _ = require('lodash');
var loaderUtils = require('loader-utils');

function processOptions(source, options) {
  if (!_.isUndefined(options.search) && !_.isUndefined(options.replace)) {
    if (!_.isUndefined(options.flags)) {
      options.search = new RegExp(options.search, options.flags);
    }

    newSource = source.replace(options.search, options.replace);
    if (options.strict === true && newSource === source) {
      throw new Error('Cannot replace ' + options.search + ' → ' + options.replace);
    }
  }

  if (options.strict === true && _.isUndefined(options.search)) {
    throw new Error('Cannot replace: search option is not defined → ' + JSON.stringify(options));
  }

  if (options.strict === true && _.isUndefined(options.replace)) {
    throw new Error('Cannot replace: replace option is not defined → ' + JSON.stringify(options));
  }

  return newSource;
}

module.exports = function (source) {
  this.cacheable();

  var options = loaderUtils.getOptions(this);

  if (_.isArray(options.multiple)) {
    options.multiple.forEach(function (suboptions) {
      suboptions.strict = !_.isUndefined(suboptions.strict) ? suboptions.strict : options.strict;
      source = processOptions(source, suboptions);
    });
  } else {
    source = processOptions(source, options);
  }

  return source;
};
