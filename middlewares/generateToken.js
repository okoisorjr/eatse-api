/* const easerModel = require('../models/authentication/easerRegistration');
const users = require('../models/authentication/registration'); */
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateClientToken = async (user) => {
  const client_details = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone
  }
  const token = jwt.sign(client_details, process.env.JWT_SECRET_KEY, {expiresIn: '2h'})
  return token;
}

exports.generateEaserToken = async (easer) => {
  const easer_details = {
    email: easer.email,
    phone: easer.phone,
    firstname: easer.firstname,
    surname: easer.surname,
    city: easer.city
  }
  const token = jwt.sign(easer_details, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});
  return token;
}
