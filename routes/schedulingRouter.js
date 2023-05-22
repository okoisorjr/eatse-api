const router = require('express').Router();
const schedulingController = require('../controllers/schedulingController');

router.post('/assign-easer-to-client', schedulingController.pairClientWithEaser);
router.post('/pair-easer-with-client', schedulingController.pairEaserWithClient);
router.get('/list-schedules/:id', schedulingController.getSchedules);

module.exports = router;