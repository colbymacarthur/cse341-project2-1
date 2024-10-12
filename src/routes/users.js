const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);

router.get('/:id', validation.validateHexkey, usersController.getUserById);

router.post('/', isAuthenticated, validation.validateUser, usersController.createUser);

router.put('/:id', isAuthenticated, validation.validateUser, usersController.updateUser);

router.delete('/:id', isAuthenticated, validation.validateHexkey, usersController.deleteUser);

module.exports = router;