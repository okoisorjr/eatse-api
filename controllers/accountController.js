const bcrypt = require('bcryptjs');
var postmark = require("postmark");
const newUser = require('../models/authentication/registration');
const {easerModel, accountModel} = require('../models/authentication/easerRegistration');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
require('dotenv').config();
const { generateClientToken, generateEaserToken } = require('../middlewares/generateToken');

const serverToken = "dd7384cd-e127-4036-a71f-4a7cdafb2e11";
const client = new postmark.ServerClient(serverToken);

function generateOTP(phone){
  var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var otp = [];
  for(let i = 0; i <= 6; i++){
    const random = Math.floor(Math.random() * numbers.length);
    if(otp.indexOf(numbers[random]) !== -1){
      continue;
    }
    otp.push(numbers[random]);
  }

  //console.log('OTP:', otp.join(''));
  /* twilio.messages.create({
    body: `Your EATSE verification code is: ${otp.join(' ')}`,
    to: `${phone}`,
    from:'+12706481755'
  })
  .then(message => {
    console.log(message.sid);
  }); */
  //return otp.join('');
};

exports.checkNumberExists = async (req, res, next) => {
  try{
    if(!req.body.phone){
      res.status(400).send({msg: 'Bad Request!'});
    }
    else{
      let account = await db.query(`SELECT * FROM accounts WHERE phone='${req.body.phone.trim()}'`);
      if(account.rowCount > 0){
        res.status(200).send({data: account.rows[0], status: true});
      }
      else{
        generateOTP(req.body.phone);
        res.status(200).send({msg: 'account not found!', status: false});
      }
    }
  }
  catch(error){
    console.log(error);
  }
}

exports.login = async (req, res, next) => {
  if(!req.body.email && !req.body.password){
    return res.status(400).send({msg: 'Please, provide a valid email address and password!'});
  }else if(!req.body.email){
    return res.status(400).send({msg: 'Please, provide a valid email address!'});
  }else if(!req.body.password){
    return res.status(400).send({msg: 'Please, provide a password!'});
  }

  let {email, password} = req.body;

  try{
    let user = await newUser.findOne({email: email});
    
    if(!user){
      return res.status(404).send({msg: 'user not found!', exists: false});
    }

    if(user.password === password){
      user.token = await generateClientToken(user);
      if(user.token){
        //res.cookie('auth_token', user.token);
        return res.status(200).send({user: {firstname: user.firstname, lastname: user.lastname, phone: user.phone, email: user.email, id: user._id}, token: user.token});
      }
      else{
        return res.status(500).send({error: 'token could not be generated!'});
      }
    }

    if(user.password !== password){
      return res.status(404).send({error: 'username and password does not exist!'});
    }
    
    /* if(user.password){
      console.log('User found but no password!');
      res.status(200).send({msg: 'User found', exists: true});
    } */
  }
  catch(error){
    console.log(error);
  }
}

exports.register = async (req, res, next) => {
  const {firstname, lastname, email, phone, password} = req.body;
  const user = new newUser();
  
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.phone = phone;
  user.token = await generateClientToken(user);

  if(password){
    user.password = password;
  }

  try{
    const saved_user = await user.save();
    if(saved_user){
      console.log(saved_user);
      
      //res.setHeader('Content-Type', 'text/html');
      //res.setHeader('authorization', user.token);
      res.status(201).send({msg: 'Account was created successfully!', id: user._id});
    }else{
      console.log('failed!');
    }
  }catch(error){
    console.log(error);
    if(error){
      res.status(500).send({msg: 'sorry, your account could not be created....please try again!'});
    }
  }
}

exports.registerEaser = async (req, res, next) => {
  const {firstname, surname, email, phone, state, city, address, acctName, acctNo, bank, status} = req.body;

  const easer = new easerModel();

  easer.email = email,
  easer.phone = phone,
  easer.firstname = firstname;
  easer.surname = surname;
  easer.state = state;
  easer.city = city;
  easer.address = address;
  easer.status = status;

  const user = await easerModel.findOne({email: email});
  if(user){
    console.log('user exists');
    res.status(409).send({msg: 'A user already exists with that email address'});
    return; 
  }

  try{
    const user = await easer.save();
    if(user){
      const easer_acct = new accountModel();

      easer_acct.acctName = acctName;
      easer_acct.acctNo = acctNo;
      easer_acct.bank = bank;
      easer_acct.user = user._id;

      try{
        const acct_details = await easer_acct.save();
        if(acct_details){
          res.status(201).json({msg: 'User was created successfully!', userInfo: user, acctDetails: acct_details});
        }
      }catch(error){
        console.log(error);
      }
    }
  }catch(error){
    console.log(error);
  }
}

exports.loginEaser = async (req, res, next) => {
  const {data, password} = req.body;

  const user = await easerModel.findOne({$or: [{email: data}, {phone: data}]});
  
  if(user && user.status){
    console.log('user was found in DB and account is active!');
    if(password == user.password){
      console.log('password match success, access granted!');
      res.status(200).send({msg: `Hey ${user.firstname}!`});
      return;
    }else{
      console.log('password match failed, access denied!');
      res.status(401).send({msg: 'email and password is incorrect'});
    }
  }else if(user && !user.status){
    console.log('user was found in DB but account is inactive!');
    res.status(401).send({msg: 'Account has not been activated!'});
  }else if(!user){
    console.log('user does not exist in Eatse DB!');
    res.status(404).send({msg: 'User was not found in our server!'});
  }
}

exports.confirmOTP = async (req, res, next) => {
  try{
    let otp = req.body.otp;
    if(otp === otp){
      res.status(200).send({msg: ''})
    }
  }
  catch(error){
    console.log(error);
  }
}