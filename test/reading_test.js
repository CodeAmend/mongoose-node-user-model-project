const assert = require('assert');

const User = require('../src/user');

describe("Reading users out of the database", () => {

  let joe, rachel, amy, debra;

  beforeEach( (done) => {
    joe = new User({name: 'joe'});
    amy = new User({name: 'amy'});
    rachel = new User({name: 'rachel'});
    debra = new User({name: 'debra'});

    Promise.all([
      joe.save(),
      amy.save(),
      rachel.save(),
      debra.save()
    ]).then( () => done() );
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

  it("can skip and limit the result set", (done) => {
    User.find({})
    .sort({name: 1})
    .skip(1)
    .limit(2)
    .then( (users) => {
      assert(users[0].name === 'debra');
      assert(users[1].name === 'joe');
      done();
    });
  });

});
