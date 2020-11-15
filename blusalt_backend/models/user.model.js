const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gameID: {
    type: String,
    default: shortid.generate()
  }
}).index({ username: 'text' });

module.exports = new mongoose.model('User', userSchema);