
const express = require('express');
const router = express.Router();
const { 
  getSketches, 
  getSketch, 
  createSketch, 
  updateSketch, 
  deleteSketch,
  likeSketch,
  unlikeSketch,
  commentSketch,
  deleteComment,
  getUserSketches
} = require('../controllers/sketch.controller');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getSketches);
router.get('/:id', getSketch);
router.post('/', protect, upload.array('media', 5), createSketch);
router.put('/:id', protect, upload.array('media', 5), updateSketch);
router.delete('/:id', protect, deleteSketch);

router.post('/:id/like', protect, likeSketch);
router.post('/:id/unlike', protect, unlikeSketch);
router.post('/:id/comments', protect, commentSketch);
router.delete('/:id/comments/:commentId', protect, deleteComment);

router.get('/user/:userId', getUserSketches);

module.exports = router;
