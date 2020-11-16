const { validationResult } = require('express-validator');
const { onDisconnect, gamePlay, getOnlineUsers, playUser } = require('../../services/game/game.service')

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
    res.json({
      status: inGame.success,
      data: inGame.data,
      message: inGame.message
    });
  } catch (error) {
    next(error);
  }
}

const disconnectUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userStatus = await onDisconnect(req.body)
    res.json({
      status: userStatus.success,
      data: userStatus.data,
      message: userStatus.message
    });
  } catch (error) {
    next(error);
  }
}


module.exports = { disconnectUser, inGamePlay, getUsersOnline, playopponent }