const express = require('express');
const {body} = require("express-validator");
const {validateUser} = require("../middleware/validationMiddleware");
const userController = require("../controllers/userController");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post(
    '/action',
    [
        // Validate request body fields
        body('userId').notEmpty().withMessage('User Id is required'),
        body('action').notEmpty().withMessage('Action is required'),
    ],
    validateUser, // Apply validation middleware
    userController.checkIfUserIsEligibleToPerformAction
);

module.exports = router;
