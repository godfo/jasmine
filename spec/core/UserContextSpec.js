describe('UserContext', function() {
  it('Behaves just like an plain object', function() {
    const context = new privateUnderTest.UserContext();
    expect(Object.keys(context)).toEqual([]);
  });

  describe('.fromExisting', function() {
    describe('when the parameter is a UserContext', function() {
      it('returns a cloned object', function() {
        const source = new privateUnderTest.UserContext();
        source.key = 'value';

        const cloned = privateUnderTest.UserContext.fromExisting(source);

        expect(cloned).toEqual(source);
      });

      it('does not return the same object', function() {
        const source = new privateUnderTest.UserContext();
        const cloned = privateUnderTest.UserContext.fromExisting(source);
        expect(cloned).not.toBe(source);
      });
    });

    describe('when the parameter is a regular object', function() {
      it('returns an object with the same attributes', function() {
        const cloned = privateUnderTest.UserContext.fromExisting({
          key: 'value'
        });
        expect(cloned.key).toEqual('value');
      });

      it('returns a UserContext', function() {
        const cloned = privateUnderTest.UserContext.fromExisting({});
        expect(cloned).toBeInstanceOf(privateUnderTest.UserContext);
      });

      it('works even if the provided object overrides hasOwnProperty', function() {
        const context = {
          key: 'value',
          hasOwnProperty() {
            return false;
          }
        };
        const cloned = privateUnderTest.UserContext.fromExisting(context);
        expect(cloned.key).toEqual('value');
      });
    });
  });
});
