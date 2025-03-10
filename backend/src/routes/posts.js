import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import Post from '../models/Post.js';

const router = express.Router();

// Post validation middleware
const postValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('content').trim().isLength({ min: 1 })
];

// Create a new post
router.post('/', auth, postValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.userId
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Get all posts OR posts by author
router.get('/', async (req, res, next) => {
  try { 
    const { author } = req.query;
    const query = author ? { author } : {};

    const posts = await Post.find(query)
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get a specific post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'email');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Update a post
router.put('/:id', auth, postValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findOne({
      _id: req.params.id,
      author: req.userId
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.userId
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;