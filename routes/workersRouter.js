const router = require('express').Router();
const workersController = require('../controllers/workersController');

router.get('/', workersController.listAllEasers);
router.get('/easers', workersController.listEasersInArea);
router.get('/easers/:state', workersController.listEasersInState);
router.get('/easers/:state/:city', workersController.listEasersInCity);

module.exports = router;

