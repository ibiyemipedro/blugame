const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  }
}).index({ username: 'text' });

module.exports = new mongoose.model('Game', GameSchema);