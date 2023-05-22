const {easerModel} = require('../models/authentication/easerRegistration');
const newUser = require('../models/authentication/registration'); 
const scheduler = require('../models/bookings/schedules');


exports.pairClientWithEaser = async (req, res, next) => {
  const currentUser = req.body.id;
  const scheduleEaser = req.body.easer_id;
  try{
    const user = await newUser.findByIdAndUpdate({_id: currentUser}, {pairedEaser: scheduleEaser}, {new: true});
    if(user){
      res.status(200).json({msg: 'User information was updated successfully!', user: user});
      console.log(user);
    }
  }catch(error){
    console.log(error);
  }
}

exports.pairEaserWithClient = async (req, res, next) => {
  const currentUser = req.body.user_id;
  const client = req.body.client_id;
  try{
    const user = await easerModel.findByIdAndUpdate({_id: currentUser}, {pairedClient: client}, {new: true});
    if(user){
      res.status(200).json({msg: 'User information was updated successfully!', user: user});
      console.log(user);
    }
  }catch(error){
    console.log(error);
  }
}

exports.getSchedules = async (req, res, next) => {
  const userId = req.params.id;
  const schedules = await scheduler.find({easer: userId});

  if(schedules){
    res.status(200).send({schedules: schedules});
    console.log(schedules);
  }
  else{
    console.log('no data found!');
  }
}