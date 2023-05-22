const router = require('express').Router();
const testimonyController = require('../controllers/testimonyController');

router.get('/', testimonyController.getTestimonies);
router.get('/testimony/:id', testimonyController.getTestimony);

module.exports = router;