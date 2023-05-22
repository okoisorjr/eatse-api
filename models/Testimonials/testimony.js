const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  } ,
  testimony: {
    type: String,
    required: true
  }  
}, {timestamps: true});

const testimonyModel = mongoose.model('testimonie', testimonySchema);

module.exports = testimonyModel;