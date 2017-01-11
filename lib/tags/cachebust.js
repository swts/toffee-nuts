'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let insertHash = function(hash, filepath) {
  let parts = filepath.split('.');
  parts.splice(parts.length - 1, 0, hash);
  return parts.join('.');
};

let CacheBust = function() {
  this.tags = [ 'cachebust' ];
};

CacheBust.prototype.parse = function(parser, nodes) {
  let token = parser.nextToken();
  let args = parser.parseSignature(null, true);
  parser.advanceAfterBlockEnd(token.value);
  return new nodes.CallExtensionAsync(this, 'render', args);
};

CacheBust.prototype.saveWithHash = function(data, filepath, url, cb) {
  const hash = crypto.createHash('md5').update(data).digest('hex');

  filepath = insertHash(hash, filepath);
  fs.writeFile(filepath, data, (err) => {
    if (err) {
      console.log(`Cachebust can't write to file: ${filepath}`, err);
      return cb(null, url);
    }

    cb(null, insertHash(hash, url));
  })
};

CacheBust.prototype.render = function(context, filepath, url, cb) {
  let fullFilepath = path.resolve(process.cwd(), filepath);

  fs.readFile(fullFilepath, (err, data) => {
    if (err) {
      console.log(`Cachebust can't read a file: ${filepath}`, err);
      return cb(null, url);
    }

    this.saveWithHash(data, fullFilepath, url, cb);
  });
};


module.exports = CacheBust;
