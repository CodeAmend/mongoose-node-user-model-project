const assert = require('assert');
const User = require('../src/user');

describe("Updating records", () => {
  let joe;

  beforeEach( (done) => {
    joe = new User({name: "Joe"});
    joe.save()
      .then( () => done() );
  });

  function assertName(operation, done) {
    operation
      .then( () => User.find({}))
      .then( (users) => {
        assert(users.length === 1);
        assert(users[0].name === 'alex');
        done();
      });
  }

  it("intance type using set and save", (done) => {
    joe.set("name", "alex");
    assertName(
      joe.save(), done);

  });
  // one go... no set AND save
  it("model instance can update", (done) => {
    assertName(
      joe.update({name: 'alex'}), done);
  });

  it("can update postCount by increment", (done) => {
    User.update({name: "Joe"}, { $inc: { likes: 5 }})
      .then( () => User.findOne({name: "Joe"}))
      .then( (user) => {
        assert(user.likes === 5);
        done();
      });
  });
});
