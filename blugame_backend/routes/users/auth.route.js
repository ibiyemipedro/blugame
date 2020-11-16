const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const { userAuth } = require('../../controllers/users/auth.controller')

router.get('/', (req, res, next) => res.json({
  status: 200,
  data: null,
  message: 'Welcome to BLUGAME, Kindly read the documentation on how to access the app'
}));


router.post('/auth', [
  body('username')
    .exists()
    .withMessage('Username is required'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),

  body('flag')
    .optional()
], userAuth);
module.exports = router