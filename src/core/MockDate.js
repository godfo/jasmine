getJasmineRequireObj().MockDate = function(j$) {
  function MockDate(global) {
    var self = this;
    var currentTime = 0;

    if (!global || !global.Date) {
      self.install = function() {};
      self.tick = function() {};
      self.uninstall = function() {};
      return self;
    }

    var GlobalDate = global.Date;

    self.install = function(mockDate) {
      if (mockDate instanceof GlobalDate) {
        currentTime = mockDate.getTime();
      } else {
        if (!j$.util.isUndefined(mockDate)) {
          j$.getEnv().deprecated(
            'The argument to jasmine.clock().mockDate(), if specified, ' +
              'should be a Date instance. Passing anything other than a Date ' +
              'will be treated as an error in a future release.'
          );
        }

        currentTime = new GlobalDate().getTime();
      }

      global.Date = FakeDate;
    };

    self.tick = function(millis) {
      millis = millis || 0;
      currentTime = currentTime + millis;
    };

    self.uninstall = function() {
      currentTime = 0;
      global.Date = GlobalDate;
    };

    createDateProperties();

    return self;

    function FakeDate() {
      switch (arguments.length) {
        case 0:
          return new GlobalDate(currentTime);
        case 1:
          return new GlobalDate(arguments[0]);
        case 2:
          return new GlobalDate(arguments[0], arguments[1]);
        case 3:
          return new GlobalDate(arguments[0], arguments[1], arguments[2]);
        case 4:
          return new GlobalDate(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3]
          );
        case 5:
          return new GlobalDate(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3],
            arguments[4]
          );
        case 6:
          return new GlobalDate(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3],
            arguments[4],
            arguments[5]
          );
        default:
          return new GlobalDate(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3],
            arguments[4],
            arguments[5],
            arguments[6]
          );
      }
    }

    function createDateProperties() {
      FakeDate.prototype = GlobalDate.prototype;

      FakeDate.now = function() {
        if (GlobalDate.now) {
          return currentTime;
        } else {
          throw new Error('Browser does not support Date.now()');
        }
      };

      FakeDate.toSource = GlobalDate.toSource;
      FakeDate.toString = GlobalDate.toString;
      FakeDate.parse = GlobalDate.parse;
      FakeDate.UTC = GlobalDate.UTC;
    }
  }

  return MockDate;
};
