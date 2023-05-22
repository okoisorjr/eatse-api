const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notice: {
    type: String,
    required: true
  },
  notifier: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  public: {
    type: Boolean,
    required: true
  }
}, {timestamps: true});

const notification = mongoose.model('notification', notificationSchema);

module.exports = notification;