const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  let token = req.header('Authorization');
  if(!token){
    return res.status(401).send({msg: 'Access denied!'});
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
  }catch(error){
    console.log(error);
  } 
  return next();
}