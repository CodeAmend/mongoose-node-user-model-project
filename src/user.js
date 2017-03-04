const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const PostSchema = require('./post_schema');

const UserSchema = Schema({
  name: {
    type:String,
    validate: {
      validator: (name) => name.length > 2,
      message: "User name must be longer than 2 characters."
    },
    required: [true, "User name required."]
  },
  posts: [PostSchema],
  likes: Number,
  // blogPosts: [{
  //   type: Schema.Types.ObjectID,
  //   ref: 'blogPost'
  // }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
