const router = require('express').Router();
const servicesController = require('../controllers/servicesController');
const authorize = require('../middlewares/verifyToken');

router.get('/', servicesController.getServices);
router.get('/service/:id', servicesController.getSingleService);
router.post('/add-service', authorize.verifyToken, servicesController.newService);

module.exports = router;