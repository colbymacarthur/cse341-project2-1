const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const result = await mongodb.getDb().collection('users').find();
    const users = await result.toArray();
    if (!users) {
      throw new Error('No users found');
    }
    if (users.length === 0) {
      res.status(404).json({ message: 'No users found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    }
  } catch (err) {
    if (err.message.includes('No users found')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error getting users:', err);
      res.status(500).json({ message: 'Error getting users' });
    }
  }
};

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    if (!userId) {
      throw new Error('Invalid user ID');
    }
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    const users = await result.toArray();
    if (users.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    if (err.message.includes('Invalid user ID')) {
      res.status(400).json({ message: err.message });
    } else if (err.message.includes('User with ID')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error getting user by ID:', err);
      res.status(500).json({ message: 'Error getting user by ID' });
    }
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const user = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    bio: req.body.bio,
    join: req.body.join,
    followers: req.body.followers,
    following: req.body.following
  };
    try {
      const result = await mongodb.getDb().collection('users').insertOne(user);
      res.status(201).json(result);
    } catch (err) {
      console.log('Error creating user:', err);
      res.status(500).json({ message: 'Error creating user' });
    } 
  };

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    if (!userId) {
      throw new Error('Invalid user ID');
    }
    const postId = ObjectId.createFromHexString(req.params.id);
    if (!postId) {
      throw new Error('Invalid post ID');
    }
    const user = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      bio: req.body.bio,
      join: req.body.join,
      followers: req.body.followers,
      following: req.body.following
    };
    const result = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, user);
    if (result.matchedCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if (result.modifiedCount === 0) {
      throw new Error(`User with ID ${userId} not updated`);
    }
    res.status(204).json(result);
  } catch (err) {
    if (err.message.includes('Missing required fields')) {
      res.status(400).json({ message: err.message });
    } else if (err.message.includes('User with ID')) {
      res.status(404).json({ message: err.message });
    } else {
      console.log('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
    }
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id)
    try {
      const result = await mongodb.getDb().collection('users').deleteOne({ _id: userId});
      res.status(204).json(result);
    } catch (err) {
      console.log('Error deleting user:', err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}