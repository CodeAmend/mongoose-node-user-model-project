const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blog_post_schema');

describe("Middleware", () => {

  let joe, blogPost;

  beforeEach( (done) => {
    joe = User({name: "Joe"});
    blogPost = new BlogPost({title: "The best title", content: "Stuff..."});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it("users clean up dangling blog posts on remove", (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
