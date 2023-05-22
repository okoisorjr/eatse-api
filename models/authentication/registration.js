const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pairedEaser: [{
    type: mongoose.Types.ObjectId,
    ref: 'easer',
  }],
  password: {
    type: String,
  },
  token: {
    type: String,
  }
}, {timestamps: true});

UserSchema.virtual('booked_services', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.set('toObject', {virtuals: true});
UserSchema.set('toJSON', {virtuals: true});

const User = mongoose.model("User", UserSchema);
 
module.exports = User;