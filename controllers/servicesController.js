const servicesModel = require('../models/services/service');

exports.getServices = async (req, res, next) => {
  let all_services = []
  try{
    all_services = await servicesModel.find({});
    if(all_services){
      return res.status(200).send({status: 'success', services: all_services});
    }else{
      console.log('could not list servicesModel!');
    }
  }catch(error){
    console.log(error);
    return res.status(500).send({error: 'Sorry, the server ran into a problem!'});
  }
}


exports.getSingleService = async (req, res, next) => {
  let {id} = req.params;

  let requested_service = await servicesModel.findOne({ _id: id});
  if(requested_service){
    return res.status(200).send({status: 'success', service: requested_service});
  }
}

exports.newService = async (req, res, next) => {
  let { service, description, cost} = req.body;
  let new_service = new servicesModel();

  try{  
    new_service.service = service;
    new_service.description = description;
    new_service.cost = cost;

    let saved = await new_service.save();
    if(saved){
      return res.status(200).send({status: 'success', id: saved._id});
    }
  }
  catch(error){
    return res.status(500).send({error: error});
  }
}