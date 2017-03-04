const assert = require('assert');

const User = require('../src/user');

describe("Reading users out of the database", () => {

  let joe;

  beforeEach( (done) => {
    joe = new User({name: 'joe'});
    joe.save()
      .then( () => done() );
  });

  it('finds all users as name of joe', (done) => {
    User.find({name: 'joe'})
      .then( (users) => {
        assert(joe._id.toString() === users[0]._id.toString());
        done();
      });
  });

  it('finds a user with a particular name', (done) => {
    User.findOne({ _id: joe._id })
      .then( (user) => {
        assert( user.name === 'joe');
        done();
      });
  });
});
