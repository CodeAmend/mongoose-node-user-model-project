const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
