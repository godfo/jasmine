getJasmineRequireObj().UserContext = function(j$, private$) {
  'use strict';

  function UserContext() {}

  UserContext.fromExisting = function(oldContext) {
    const context = new UserContext();

    for (const [k, v] of Object.entries(oldContext)) {
      context[k] = v;
    }

    return context;
  };

  return UserContext;
};
