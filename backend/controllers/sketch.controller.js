
const Sketch = require('../models/Sketch');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get all sketches
// @route   GET /api/sketches
// @access  Public
exports.getSketches = async (req, res) => {
  try {
    const { search, tag, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = { isPublic: true, isDraft: false };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const sketches = await Sketch.find(query)
      .populate('author', 'username displayName profileImage')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Sketch.countDocuments(query);

    res.json({
      success: true,
      count: sketches.length,
      total,
      pages: Math.ceil(total / limit),
      sketches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single sketch
// @route   GET /api/sketches/:id
// @access  Public (with restrictions)
exports.getSketch = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id)
      .populate('author', 'username displayName profileImage')
      .populate('comments.user', 'username displayName profileImage')
      .populate('likes', 'username displayName profileImage');

    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Check if private sketch and user is not the author
    if (!sketch.isPublic && (!req.user || req.user.id !== sketch.author._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this sketch'
      });
    }

    res.json({
      success: true,
      sketch
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create sketch
// @route   POST /api/sketches
// @access  Private
exports.createSketch = async (req, res) => {
  try {
    const { title, content, tags, isPublic, isDraft } = req.body;

    // Process uploaded media files
    const media = req.files ? req.files.map(file => file.path.replace('\\', '/')) : [];

    const newSketch = new Sketch({
      title,
      content,
      author: req.user.id,
      media,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isPublic: isPublic === 'false' ? false : true,
      isDraft: isDraft === 'true' ? true : false
    });

    const sketch = await newSketch.save();
    await sketch.populate('author', 'username displayName profileImage');

    res.status(201).json({
      success: true,
      sketch
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update sketch
// @route   PUT /api/sketches/:id
// @access  Private
exports.updateSketch = async (req, res) => {
  try {
    let sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Check if user owns the sketch
    if (sketch.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this sketch'
      });
    }

    const { title, content, tags, isPublic, isDraft, keepMedia } = req.body;
    
    // Build update object
    const updateData = {
      title: title || sketch.title,
      content: content || sketch.content,
      isPublic: isPublic === undefined ? sketch.isPublic : isPublic === 'false' ? false : true,
      isDraft: isDraft === undefined ? sketch.isDraft : isDraft === 'true' ? true : false
    };

    // Handle tags
    if (tags) {
      updateData.tags = tags.split(',').map(tag => tag.trim());
    }

    // Handle media files
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map(file => file.path.replace('\\', '/'));
      
      if (keepMedia === 'true') {
        updateData.media = [...sketch.media, ...newMedia];
      } else {
        updateData.media = newMedia;
      }
    }

    // Update sketch
    sketch = await Sketch.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username displayName profileImage');

    res.json({
      success: true,
      sketch
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete sketch
// @route   DELETE /api/sketches/:id
// @access  Private
exports.deleteSketch = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Check if user owns the sketch
    if (sketch.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this sketch'
      });
    }

    // Delete any related notifications
    await Notification.deleteMany({ relatedSketch: req.params.id });
    
    // Delete sketch
    await sketch.deleteOne();

    res.json({
      success: true,
      message: 'Sketch removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like sketch
// @route   POST /api/sketches/:id/like
// @access  Private
exports.likeSketch = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Check if already liked
    if (sketch.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Sketch already liked'
      });
    }

    // Add like
    sketch.likes.unshift(req.user.id);
    await sketch.save();

    // Create notification if the liker is not the sketch author
    if (req.user.id !== sketch.author.toString()) {
      await Notification.create({
        recipient: sketch.author,
        sender: req.user.id,
        type: 'like',
        content: `liked your sketch "${sketch.title}"`,
        relatedSketch: sketch._id
      });
    }

    res.json({
      success: true,
      likes: sketch.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Unlike sketch
// @route   POST /api/sketches/:id/unlike
// @access  Private
exports.unlikeSketch = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Check if not liked
    if (!sketch.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Sketch has not been liked yet'
      });
    }

    // Remove like
    sketch.likes = sketch.likes.filter(like => like.toString() !== req.user.id);
    await sketch.save();

    res.json({
      success: true,
      likes: sketch.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Comment on sketch
// @route   POST /api/sketches/:id/comments
// @access  Private
exports.commentSketch = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id
    };

    // Add comment
    sketch.comments.unshift(newComment);
    await sketch.save();

    // Populate user info
    const updatedSketch = await Sketch.findById(req.params.id)
      .populate('comments.user', 'username displayName profileImage');

    // Create notification if commenter is not the sketch author
    if (req.user.id !== sketch.author.toString()) {
      await Notification.create({
        recipient: sketch.author,
        sender: req.user.id,
        type: 'comment',
        content: `commented on your sketch "${sketch.title}"`,
        relatedSketch: sketch._id
      });
    }

    res.json({
      success: true,
      comments: updatedSketch.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/sketches/:id/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);

    // Check if sketch exists
    if (!sketch) {
      return res.status(404).json({
        success: false,
        message: 'Sketch not found'
      });
    }

    // Find comment
    const comment = sketch.comments.find(comment => comment._id.toString() === req.params.commentId);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is comment author or sketch author
    if (comment.user.toString() !== req.user.id && sketch.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    // Remove comment
    sketch.comments = sketch.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );

    await sketch.save();

    res.json({
      success: true,
      comments: sketch.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's sketches
// @route   GET /api/sketches/user/:userId
// @access  Public (with restrictions)
exports.getUserSketches = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = { 
      author: req.params.userId,
      isPublic: true,
      isDraft: false
    };
    
    // If user is viewing their own sketches, show private and drafts
    if (req.user && req.user.id === req.params.userId) {
      query = { author: req.params.userId };
    }

    const sketches = await Sketch.find(query)
      .populate('author', 'username displayName profileImage')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Sketch.countDocuments(query);

    res.json({
      success: true,
      count: sketches.length,
      total,
      pages: Math.ceil(total / limit),
      sketches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
