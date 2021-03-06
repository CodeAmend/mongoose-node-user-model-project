const assert = require('assert');
const User = require('../src/user');

describe("Validating records", () => {

  it("requires a username", () => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert(message === "User name required.");
  });

  it("should have a name length of at least 3", () => {
    const user = new User({name: "ab"});
    const {message} = user.validateSync().errors.name;
    assert(message === "User name must be longer than 2 characters.");
  });

  it("disallows impropper records from being saved", (done) => {
    const user = new User({name: "ae"});
    user.save()
      .catch( (validationResult) => {
        const {message} = validationResult.errors.name;
        assert(message === "User name must be longer than 2 characters.");
        done();
      });
  });
});
