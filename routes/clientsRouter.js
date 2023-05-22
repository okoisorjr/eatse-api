const router = require('express').Router();
const clientsController = require('../controllers/clientsController');
const authorize = require('../middlewares/verifyToken');

router.get('/', authorize.verifyToken, clientsController.listAllClients);

module.exports = router;