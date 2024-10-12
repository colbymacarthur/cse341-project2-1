const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllPosts = async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const result = await mongodb.getDb().collection('posts').find();
    const posts = await result.toArray();
    if (!posts) {
      throw new Error('No posts found');
    }
    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(posts);
    }
  } catch (err) {
    if (err.message.includes('No posts found')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error getting posts:', err);
      res.status(500).json({ message: 'Error getting posts' });
    }
  }
};

const getPostById = async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const postId = ObjectId.createFromHexString(req.params.id);
    if (!postId) {
      throw new Error('Invalid post ID');
    }
    const result = await mongodb.getDb().collection('posts').find({ _id: postId });
    const posts = await result.toArray();
    if (posts.length === 0) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(posts);
  } catch (err) {
    if (err.message.includes('Invalid post ID')) {
      res.status(400).json({ message: err.message });
    } else if (err.message.includes('Post with ID')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error getting post by ID:', err);
      res.status(500).json({ message: 'Error getting post by ID' });
    }
  }
};

const createPost = async (req, res) => {
  // #swagger.tags = ['Posts']
    const post = {
        userName: req.body.userName,
        content: req.body.content,
        date: req.body.date,
        likes: req.body.likes || 0
    };
    try {
      const result = await mongodb.getDb().collection('posts').insertOne(post);
      res.status(201).json(result);
    } catch (err) {
      console.log('Error creating post:', err);
      res.status(500).json({ message: 'Error creating post' });
    } 
  };

const updatePost = async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const postId = ObjectId.createFromHexString(req.params.id);
    if (!req.body.userName || !req.body.content) {
      throw new Error('Missing required fields: userName and content');
    }
    const post = {
      userName: req.body.userName,
      content: req.body.content,
      date: req.body.date,
      likes: req.body.likes
    };
    const result = await mongodb.getDb().collection('posts').replaceOne({ _id: postId }, post);
    if (result.matchedCount === 0) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    if (result.modifiedCount === 0) {
      throw new Error(`Post with ID ${postId} not updated`);
    }
    res.status(204).json(result);
  } catch (err) {
    if (err.message.includes('Missing required fields')) {
      res.status(400).json({ message: err.message });
    } else if (err.message.includes('Post with ID')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error updating post:', err);
      res.status(500).json({ message: 'Error updating post' });
    }
  }
};

const deletePost = async (req, res) => {
  // #swagger.tags = ['Posts']
    const postId = ObjectId.createFromHexString(req.params.id)
    try {
      const result = await mongodb.getDb().collection('posts').deleteOne({ _id: postId});
      res.status(204).json(result);
    } catch (err) {
      console.log('Error deleting post:', err);
      res.status(500).json({ message: 'Error deleting post' });
    }
  };

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}