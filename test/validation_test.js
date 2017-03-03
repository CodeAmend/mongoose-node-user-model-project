const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe("Validating records", () => {
  it("requires a username", () => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    console.log(message);
    assert(message === "User name required.")
  });
});
