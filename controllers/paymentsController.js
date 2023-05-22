const paymentModel = require('../models/Payments/paymentReciept');

exports.getUserPayments = async (req, res, next) => {
  try{
    const paymentHistory = paymentModel.find({ user: req.params.id });

    if(paymentHistory){
      res.status(200).send({payments: paymentHistory});
      console.log(paymentHistory);
    }
  }catch(error){
    console.log(error);
  }
}