const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { validateUser, validateAction} = require('../middleware/validationMiddleware');

/* POST Create User. */
router.post(
    '/',
    [
      // Validate request body fields
      body('firstname').notEmpty().withMessage('First name is required'),
      body('lastname').notEmpty().withMessage('Last name is required'),
      body('email').isEmail().withMessage('Invalid email address'),
    ],
    validateUser, // Apply validation middleware
    validateAction,
    userController.createUser
);

/* GET all users. */
router.get('/', userController.getAllUsers);

/* GET user by ID. */
router.get('/:userId', userController.getUserById);

/* PUT Update user by ID. */
router.put(
    '/:userId',
    [
      // Validate request body fields
      body('firstname').notEmpty().withMessage('First name is required'),
      body('lastname').notEmpty().withMessage('Last name is required'),
      body('email').isEmail().withMessage('Invalid email address'),
    ],
    validateUser, // Apply validation middleware
    validateAction,
    userController.updateUser
);

/* DELETE Delete user by ID. */
router.delete('/:userId', userController.deleteUser);

/* DELETE Delete all users. */
router.delete('/', userController.deleteAllUsers);


module.exports = router;
