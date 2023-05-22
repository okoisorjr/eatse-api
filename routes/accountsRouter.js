  const router = require('express').Router();
  const accountController = require('../controllers/accountController');

  router.post('/create-account', accountController.register);
  router.post('/new-easer', accountController.registerEaser);
  router.post('/get-account', accountController.checkNumberExists);
  router.post('/login', accountController.login);
  router.post('/login-easer', accountController.loginEaser);

  module.exports = router;