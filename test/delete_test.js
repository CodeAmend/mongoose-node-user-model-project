const assert = require('assert');

const User = require('../src/user');

describe('Deleting a user: ', () => {

  let joe;
  beforeEach( (done) => {
    joe = new User( {name: "Joe"} );
    joe.save()
      .then( () => done() );
  });

  function assertUser(operation, done) {
    operation
      .then( () => User.findOne({name: "Joe"}))
      .then( (user) => {
        assert(user === null);
        done();
      });
  }

  it('model instance remove', (done) => {
    assertUser(joe.remove(), done);
  });

  it('class method remove', (done) => {
    assertUser(
      User.remove({name: "Joe"}), done);
  });

  it('class findOneAndRemove', (done) => {
    assertUser(
      User.findOneAndRemove({name: "Joe"}),done);
  });

  it('class findByIdAndRemove', (done) => {
    assertUser(
      User.findOneAndRemove(joe._id), done);
  });

  it("a model class can update", (done) => {
    assertUser(
      User.update({name: "Joe"}, {name: "alex"}),
      done
    );
  });

  it("a model class can update in one record", (done) => {
    assertUser(
      User.findOneAndUpdate({name: "Joe"}, {name: "alex"}),
      done
    );
  });

  it("a model class can update by find id and update", (done) => {
    assertUser(
      User.findByIdAndUpdate(joe._id, {name: 'alex'}),
      done
    );
  });

});
