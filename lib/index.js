'use strict';
const CacheBust = require('./tags/cachebust');

module.exports = function(env, debug) {
  env.addExtension('cachebust', new CacheBust());
  return env;
};
