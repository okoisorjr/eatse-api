const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  easer: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const schedule = mongoose.model('schedule', scheduleSchema);

module.exports = schedule;