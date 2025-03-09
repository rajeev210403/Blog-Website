const Post = require("../models/Post");

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, authorId: req.user.userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating post", error });
  }
};

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId", "email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching posts", error });
  }
};

// Get posts by specific author
exports.getPostsByAuthor = async (req, res) => {
  try {
    const { author } = req.query;
    const posts = await Post.find({ authorId: author }).populate("authorId", "email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching author's posts", error });
  }
};
