const { Schema, model } = require('mongoose');

const chat = new Schema({
  roomNumber: String,
  productId: String,
  toUserId: String,
  fromUserId: String,
  chat: String,
  time: Date
});


module.exports = model('Chat', chat);
