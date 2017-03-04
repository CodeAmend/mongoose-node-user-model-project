const User = require('../src/user');
const BlogPost = require('../src/blog_post_schema');
const Comment = require('../src/comments_schema');
const assert = require('assert');

describe("Association test", () => {

  let joe, blogPost, comment;

  beforeEach( (done) => {
    joe = User({name: "Joe"});
    blogPost = BlogPost({title: "The best title", content: "Stuff..."});
    comment = Comment({content: "dude..."});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save()
    ]).then(() => {
      done();
    });
  });

  it("Saves a relation between user and blogpost", (done) => {
    User.findOne({name: "Joe"})
      .populate('blogPosts')
      .then( (user) => {
        assert(user.blogPosts[0].title === 'The best title');
        done();
      });
  });

  it("Saves a full relation graph", (done) => {
    User.findOne({name: "Joe"})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      }).then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'The best title');
        assert(user.blogPosts[0].comments[0].content === 'dude...');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });

});
