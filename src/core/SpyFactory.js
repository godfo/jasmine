getJasmineRequireObj().SpyFactory = function(j$, private$) {
  'use strict';

  function SpyFactory(
    getCustomStrategies,
    getDefaultStrategyFn,
    getMatchersUtil
  ) {
    this.createSpy = function(name, originalFn) {
      if (private$.isFunction(name) && originalFn === undefined) {
        originalFn = name;
        name = originalFn.name;
      }

      return private$.Spy(name, getMatchersUtil(), {
        originalFn,
        customStrategies: getCustomStrategies(),
        defaultStrategyFn: getDefaultStrategyFn()
      });
    };

    this.createSpyObj = function(baseName, methodNames, propertyNames) {
      const baseNameIsCollection =
        private$.isObject(baseName) || Array.isArray(baseName);

      if (baseNameIsCollection) {
        propertyNames = methodNames;
        methodNames = baseName;
        baseName = 'unknown';
      }

      const obj = {};

      const methods = normalizeKeyValues(methodNames);
      for (let i = 0; i < methods.length; i++) {
        const spy = (obj[methods[i][0]] = this.createSpy(
          baseName + '.' + methods[i][0]
        ));
        if (methods[i].length > 1) {
          spy.and.returnValue(methods[i][1]);
        }
      }

      const properties = normalizeKeyValues(propertyNames);
      for (let i = 0; i < properties.length; i++) {
        const descriptor = {
          enumerable: true,
          get: this.createSpy(baseName + '.' + properties[i][0] + '.get'),
          set: this.createSpy(baseName + '.' + properties[i][0] + '.set')
        };
        if (properties[i].length > 1) {
          descriptor.get.and.returnValue(properties[i][1]);
          descriptor.set.and.returnValue(properties[i][1]);
        }
        Object.defineProperty(obj, properties[i][0], descriptor);
      }

      if (methods.length === 0 && properties.length === 0) {
        throw new Error(
          'createSpyObj requires a non-empty array or object of method names to create spies for'
        );
      }

      return obj;
    };
  }

  function normalizeKeyValues(object) {
    if (Array.isArray(object)) {
      return Array.prototype.map.call(object, x => [x]);
    } else if (private$.isObject(object)) {
      return Object.entries(object);
    } else {
      return [];
    }
  }

  return SpyFactory;
};
