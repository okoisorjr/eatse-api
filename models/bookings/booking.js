const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  services: {
    type: [String],
    required: true
  },
  extras: {
    type: [String],
    required: false
  },
  rooms: {
    type: Number,
    required: true
  },
  cleaningHours: {
    type: Number,
    required: true
  },
  monthly: {
    type: Boolean,
    required: true
  },
  dates: {
    type: [String],
  },
  weekly: {
    type: Boolean,
    required: true
  },
  days: {
    type: [String],
    required: false
  },
  oneTime: {
    type: Boolean,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  user: {  
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;