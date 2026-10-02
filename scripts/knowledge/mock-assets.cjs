const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  if (/\.(svg|png|jpg|jpeg|gif|webp)$/.test(id)) {
    return id; // Mock it by returning the path
  }
  return originalRequire.apply(this, arguments);
};
