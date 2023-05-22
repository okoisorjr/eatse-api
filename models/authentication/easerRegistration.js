const mongoose = require('mongoose');

const easerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  password:{
    type: String,
  },
  pairedClient: [{
    type: mongoose.Types.ObjectId,
    ref: 'user',
  }],
  token: {
    type: String
  }
}, {timestamps: true});

const accountDetailsSchema = new mongoose.Schema({
  acctName: {
    type: String,
    required: true
  },
  acctNo: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId, 
    ref: 'accountDetail',
    required: true
  },
}, {timestamps: true});

const easerModel = mongoose.model('Easer', easerSchema);
const accountModel = mongoose.model('accountDetail', accountDetailsSchema);

module.exports = { easerModel, accountModel };