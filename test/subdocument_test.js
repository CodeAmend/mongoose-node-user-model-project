const User = require('../src/user');
const assert = require('assert');

describe("subdocument test", () => {

  let joe;

  it("it should take post objects", (done) => {

    const joe = new User( {
      name: "Joe",
      posts: [{ title: "hi" }]
    });
    joe.save()
      .then( () => User.findOne({name: "Joe"}))
      .then( (user) => {
        assert(user.posts[0].title === 'hi');
        done();
      });
  });

  it("Can add subdocument to existing record", (done) => {
    const joe = User({
      name: "Joe",
      posts: []
    });
    joe.save()
      .then( () => User.findOne({name: "Joe"}))
      .then( (user) => {
        user.posts.push({title: "hello"});
        return user.save();
      })
      .then( ()=> User.findOne({name: "Joe"}))
      .then( (user) => {
        assert(user.posts[0].title === "hello");
        done();
      });
  });

  it("Can remove an existing subdocument", (done) => {
    joe = new User({
      name: "Joe",
      posts: [{title: "New Title"}]
    });
    joe.save()
      .then( () => User.findOne({name: "Joe"}))
      .then( (user) => {
        const post = user.posts[0];
        // Because its a subdocument, no request made to db
        // so you must save()
        post.remove();
        // Important!!! save() called on parent!!!
        return user.save();
      })
      .then( () => {
        User.findOne({name: "Joe"})
          .then( (user) => {
            assert(user.posts.length === 0);
            done();
          });
      });
  });
});
