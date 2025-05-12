
const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  updateUser, 
  followUser, 
  unfollowUser, 
  getUserFollowers,
  getUserFollowing
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', protect, upload.single('profileImage'), updateUser);
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);
router.get('/:id/followers', getUserFollowers);
router.get('/:id/following', getUserFollowing);

module.exports = router;
