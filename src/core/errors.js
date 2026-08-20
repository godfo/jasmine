getJasmineRequireObj().errors = function() {
  'use strict';

  function ExpectationFailed() {}

  ExpectationFailed.prototype = new Error();
  ExpectationFailed.prototype.constructor = ExpectationFailed;

  class PendingSpecException extends Error {
    constructor(message) {
      super();
      this.message = message;
      this.name = 'PendingSpecException';
    }
  }

  class NotApplicableSpecException extends Error {
    constructor(message) {
      super();
      this.message = message;
      this.name = 'NotApplicableSpecException';
    }
  }

  return {
    ExpectationFailed,
    PendingSpecException,
    NotApplicableSpecException
  };
};
