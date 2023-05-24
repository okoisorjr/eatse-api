const bcrypt = require('bcryptjs');
const { v4 : uuidv4 } = require('uuid');
const User = require('../models/authentication/registration');
const Bookings = require('../models/bookings/booking');

exports.bookings = async (req, res, next) => {
  const {user, services, extras, rooms, cleaningHours, monthly, dates, weekly, days, oneTime, price, paid} = req.body;
  const currentUser = await User.findById(user);

  if(!currentUser){
    res.status(404).send({error: 'User does not exist!'});
  }
  else{
    if(rooms > 0 && cleaningHours > 0){
      let booking = new Bookings();
      
      //new mongoose.Types.ObjectId(user);
      booking.services = services;
      booking.extras = extras;
      booking.rooms = rooms;
      booking.cleaningHours = cleaningHours;
      booking.monthly = monthly;
      booking.dates = dates;
      booking.weekly = weekly;
      booking.days = days;
      booking.oneTime = oneTime;
      booking.price = price;
      booking.paid = paid;
      booking.user = currentUser._id;

      try{
        const new_booking = await booking.save();

        if(new_booking){
          console.log('Booking was successful!', new_booking);
          res.status(201).send({msg: 'Booking was successful'});
        }
        else{
          res.status(401).send({msg: 'Bad request!'});
        }
      
      }catch(error){
        console.log(error);
      }
    }
  }
}

exports.list_bookings = async (req, res, next) => {
  const user_id = req.body.user_id;

  if(user_id){
    try{
      let user = await User.find().populate({path: 'booked_services'});
      res.status(200).send({user: user});
      console.log(user);
    }
    catch(error){
      console.log(error);
    }
  }
}