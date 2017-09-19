'use strict';
const fs = require('fs');
const path = require('path');
const mm = require('micromatch');

const insertBeforeExt = function(filepath, str) {
  const parts = filepath.split('.');
  const ext = parts.pop();
  return parts.join('.') + `${str}.${ext}`;
};

const CacheBust = function() {
  this.tags = [ 'cachebust' ];
};

CacheBust.prototype.parse = function(parser, nodes) {
  const token = parser.nextToken();
  const args = parser.parseSignature(null, true);
  parser.advanceAfterBlockEnd(token.value);
  return new nodes.CallExtensionAsync(this, 'render', args);
};

CacheBust.prototype.render = function(context, filepath, cb) {
  const fullFilepath = path.resolve(process.cwd(), filepath);

  this.getUrl({
    dirname: path.dirname(fullFilepath),
    basename: path.basename(fullFilepath)
  }, cb);
};

CacheBust.prototype.getUrl = function(opts, cb) {
  fs.readdir(opts.dirname, (err, files) => {
    if (err) {
      return cb(null, opts.basename);
    }

    const match = mm.match(files, insertBeforeExt(opts.basename, '*'));
    cb(null, match[0]);
  });
};

module.exports = CacheBust;
