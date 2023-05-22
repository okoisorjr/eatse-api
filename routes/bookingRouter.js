const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const authorize = require('../middlewares/verifyToken');

router.post('/book', authorize.verifyToken, bookingController.bookings);
router.post('/allbooks', authorize.verifyToken, bookingController.list_bookings);
module.exports = router;