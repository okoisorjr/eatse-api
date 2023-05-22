const router = require('express').Router();
const notificationsController = require('../controllers/notificationController');

router.get('/list-notifications/:userid', notificationsController.listNotifications);
router.post('/create-notice', notificationsController.createNotice);
router.put('/edit-notice', notificationsController.editNotice);
router.delete('/remove-notice/:id', notificationsController.deleteNotice);

module.exports = router;