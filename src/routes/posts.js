const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const postsController = require('../controllers/posts');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', postsController.getAllPosts);

router.get('/:id', validation.validateHexkey, postsController.getPostById);

router.post('/', isAuthenticated, validation.validatePost, postsController.createPost);

router.put('/:id', isAuthenticated, validation.validatePost, postsController.updatePost);

router.delete('/:id', isAuthenticated, validation.validateHexkey, postsController.deletePost);

module.exports = router;