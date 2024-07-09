const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  maxPictures: {
    type: Number,
    required: true,
  },
  pictures: {
    type: [String],
    required: true,
  },
});

module.exports = Car = mongoose.model('car', CarSchema);