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

  //if(rooms > 1 && duration >= 1){
    /* const checkUser = await db.query(`SELECT * FROM accounts WHERE user_id=${user_id}`);
    let id = uuidv4();
    if(checkUser.rowCount == 0){
      res.status(404).send({msg: 'user does not exist!'});
    }else{
      const new_booking = db.query(`INSERT INTO bookings 
                                    (id, services, extras, rooms, duration, weekly, days, price, paid, onetime, user_id) 
                                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
                                    [id, req.body.services, req.body.extras, rooms, duration, weekly, days, price, paid, onetime, user_id],
                                  );
      if(new_booking){
        res.status(201).send({id: `${id}`});
        console.log(new_booking);
      }
    } */
  //}
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