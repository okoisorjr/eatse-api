const newUser = require('../models/authentication/registration');

exports.listAllClients = async (req, res, next) => {
  try{
    const clients = await newUser.find();
    if(clients){
      res.status(200).json({consumers: clients});
      console.log(clients);
    }
  }catch(error){
    console.log(error);
  }
};