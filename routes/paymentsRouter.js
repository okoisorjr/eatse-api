const router = require('express').Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/list-payments', paymentsController.getUserPayments);

module.exports = router;
