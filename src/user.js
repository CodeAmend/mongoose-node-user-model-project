const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type:String,
    validate: {
      validator: (name) => name.length > 2,
      message: "User name must be longer than 2 characters."
    },
    required: [true, "User name required."]
  },
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
