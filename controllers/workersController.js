const {easerModel} = require('../models/authentication/easerRegistration');

exports.listAllEasers = async (req, res, next) => {
  try{
    const easers = await easerModel.find();
    if(easers){
      res.status(200).json({easers: easers});
      console.log(easers);
    }
  }catch(error){
    console.log(error);
  }
};

exports.listEasersInState = async (req, res, next) => {
  const {state} = req.params;
  try{
    const easers = await easerModel.find({state: state}).limit(10);
    if(easers){
      res.status(200).json({easers: easers});
      console.log(easers);
    }
  }catch(error){
    console.log(error);
  }
}

exports.listEasersInCity = async (req, res, next) => {
  const {state, city} = req.params;
  try{
    const easers = await easerModel.find({state: state, city: city}).limit(10);
    if(easers){
      res.status(200).json({easers: easers});
      console.log(easers);
    }
  }catch(error){
    console.log(error);
  }
}

exports.listEasersInArea = async (req, res, next) => {
  const {state, city} = req.query;
  try{
    const easers = await easerModel.find({$or: [{state: state}, {city: city}]}).limit(10);
    if(easers){
      res.status(200).json({easers: easers});
      console.log(easers);
    }
  }catch(error){
    console.log(error);
  }
}
