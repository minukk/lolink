const { Schema, model } = require('mongoose');

const room = new Schema({
  _id: String,
  title: String,
  buyerId: String,
  buyerNickname: String,
  sellerId: String,
  sellerNickname: String,
  productId: String,
  productPrice: String,
  close: Boolean,
});

module.exports = model('Room', room);
