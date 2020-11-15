const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../utils/middlewares/isAuth');
const { saveGameScore, inGamePlay, getUsersOnline, playopponent } = require('../../controllers/game/game.controller')

const router = express.Router();


router.post('/usersonline', isAuth, [
  body('username')
    .exists()
    .withMessage('Username is required'),
], getUsersOnline);

router.post('/playuser', isAuth, [
  body('username')
    .exists()
    .withMessage('Username is required'),
  body('opponent')
    .exists()
    .withMessage('Opponent is required'),
  body('question')
    .exists()
    .withMessage('Question is required'),
], playopponent);

router.post('/gameplay', isAuth, [
  body('gameId')
    .exists()
    .withMessage('gameId is required'),
  body('username')
    .exists()
    .withMessage('username is required'),
  body('opponent')
    .exists()
    .withMessage('opponent is required'),
  body('reply')
    .exists()
    .withMessage('reply is required'),
], inGamePlay);




router.post('/saveScore', isAuth, [
  body('username')
    .exists()
    .withMessage('Username is required'),

  body('score')
    .exists()
    .withMessage('Score is required')
    .isNumeric()
    .withMessage('Enter a valid score'),

], saveGameScore);

module.exports = router;