const assert = require('assert');
const User = require('../src/user');

describe("Virtual types", () => {

  let joe;

  it("postCount returns number of posts", (done) => {
    joe = new User({
      name: "joe",
      posts: [
        {title: "First Title"},
        {title: "Second Title"}
      ]
    });
    joe.save()
      .then(() => {
        assert(joe.postCount === 2);
        done();
      });
  });
});
