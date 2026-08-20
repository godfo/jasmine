(function() {
  specHelpers.requiresBrowser = function() {
    if (typeof window === 'undefined') {
      notApplicable('This test only runs in browsers.');
    }
  };

  specHelpers.requiresNode = function() {
    const isNode =
      typeof process !== 'undefined' &&
      process.versions &&
      typeof process.versions.node === 'string';

    if (!isNode) {
      notApplicable('This test only runs in Node');
    }
  };
})();
