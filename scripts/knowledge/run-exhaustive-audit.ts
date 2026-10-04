import Module from 'module';
const originalRequire = Module.prototype.require;

// Mock image and svg imports
Module.prototype.require = function(id) {
  if (id.endsWith('.svg') || id.endsWith('.png') || id.endsWith('.webp') || id.endsWith('.jpg') || id.endsWith('.gif')) {
    return { src: id };
  }
  return originalRequire.apply(this, arguments as any);
};

require('./exhaustive-audit.ts');
