const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  
}, {timestamps: true});

const serviceModel = mongoose.model('service', serviceSchema);
module.exports = serviceModel;