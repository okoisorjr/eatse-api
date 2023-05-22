const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true
  },
  charges: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  recepientAccountName: {
    type: String,
    required: true
  },
  status:{
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
}, {timestamps: true});

const paymentReciepts = mongoose.model('', paymentSchema);

module.exports = paymentReciepts;