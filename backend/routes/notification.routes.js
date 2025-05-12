
const express = require('express');
const router = express.Router();
const { 
  getNotifications, 
  markAsRead, 
  markAllAsRead,
  deleteNotification
} = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, getNotifications);
router.put('/:id', protect, markAsRead);
router.put('/', protect, markAllAsRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;
