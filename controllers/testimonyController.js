const testimonyModel = require('../models/Testimonials/testimony');

exports.getTestimonies = async (req, res, next) => {
  let testimony = [];

  try{
    testimony = await testimonyModel.find().limit(3);
    if(testimony.length > 0){
      res.status(200).send({status: 'success!', testimonies: testimony});
    }
    else{
      res.status(200).send({status: 'success!', msg: 'There are no testimonies availaible right now!'});
    }
  }
  catch(error){
    res.status(500).send({status: 'failed!', error: error});
  }
}

exports.getTestimony = async (req, res, next) => {
  
}