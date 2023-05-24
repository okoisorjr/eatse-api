const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const authorize = require('../middlewares/verifyToken');

router.post('/book', authorize.verifyToken, bookingController.bookings);
router.get('/allbooks', authorize.verifyToken, bookingController.list_bookings);
/* router.get('all-bookings', authorize.verifyToken, bookingController.list_bookings); */

module.exports = router;