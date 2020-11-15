const { validationResult } = require('express-validator');
const { saveScore, gamePlay, getOnlineUsers, playUser } = require('../../services/game/game.service')

const getUsersOnline = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const onlineUsers = await getOnlineUsers(req.body)
    res.json({
      status: onlineUsers.success,
      data: onlineUsers.data,
      message: onlineUsers.message
    });
  } catch (error) {
    next(error);
  }
}

const playopponent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const playOpponent = await playUser(req.body)
    res.json({
      status: playOpponent.success,
      data: playOpponent.data,
      message: playOpponent.message
    });
  } catch (error) {
    next(error);
  }
}

const inGamePlay = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const inGame = await gamePlay(req.body);
    if (inGame.success) {
      res.status(200).json({
        status: true,
        data: null
      });
    } else {
      res.status(503).json({
        status: false,
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
}


const saveGameScore = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const game = await saveScore(req.body)
    if (game) {
      return res.status(200).json({
        status: true,
        message: "Saved score success",
        data: null
      });
    } else {
      res.status(503).json({
        status: false,
        message: "Could not save game score",
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
}







module.exports = { saveGameScore, inGamePlay, getUsersOnline, playopponent }
