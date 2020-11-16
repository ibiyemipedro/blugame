const User = require('../../models/user.model');
const socketIO = require('../../socket');
const { responseBuilder, formatMessage } = require('../../utils/utils');
const gameUsers = [];
const playingUsers = [];
const activeGames = {};

/**
 * Get users online
 * @param username 
 * @returns status - Object
*/
const getOnlineUsers = async ({ username }) => {
  let responseObj = responseBuilder();
  try {
    const isOnline = gameUsers.includes(username);
    if (!isOnline) {
      gameUsers.push(username)
    }
    socketIO.getIO().emit('allUsersOnline', [...gameUsers]);
    responseObj = responseBuilder(true, gameUsers);
    return responseObj
  } catch (error) {
    console.log('Getting users online', error)
    throw error;
  }
}

/**
 * Play a user - start game
 * @param username 
 * @param opponent 
 * @param question 
 * @returns status - Object
*/
const playUser = async ({ username, opponent, question }) => {
  let responseObj = responseBuilder();
  try {
    const isPlaying = playingUsers.includes(opponent);
    if (isPlaying) {
      responseObj = responseBuilder(false, null, 'User is not currently available');
      return responseObj
    }
    let opponentUser = await User.findOne({ username: opponent });
    if (!opponentUser) {
      responseObj = responseBuilder(false, null, 'Game could not start, try again');
      return responseObj
    }
    const gameId = opponent
    const newGameObj = {
      status: true,
      opponent: opponent,
      sender: username,
      message: 'I have a word in mind, Lets Play guess game',
    }
    activeGames[gameId] = {
      player: username,
      opponent: opponent,
      question: question,
      count: 0
    }
    const formattedMessage = formatMessage(newGameObj.sender, newGameObj.message);
    playingUsers.push(username, opponent);
    socketIO.getIO().emit(opponent, { message: formattedMessage, opponent: username });
    responseObj = responseBuilder(true, gameId, 'Game started ...');
    return responseObj
  } catch (error) {
    console.log('Error playing game', error)
    throw error;
  }
}

/**
 * In game play
 * @param gameId 
 * @param username 
 * @param opponent 
 * @param reply 
 * @returns status - Object
*/
const gamePlay = async ({ gameId, username, opponent, reply }) => {
  let responseObj = responseBuilder(true);
  try {
    const newGameObj = {
      status: true,
      opponent: opponent,
      sender: username,
      message: reply
    }
    if (activeGames[gameId].opponent == username) {
      activeGames[gameId].count += 1
    }
    if (activeGames[gameId].question.toLowerCase() == reply.toLowerCase()) {
      playingUsers.pop(username, opponent);
      let gameOptions = {
        message: `${activeGames[gameId].opponent} has won the game`,
        status: 1
      }
      delete activeGames[gameId];
      socketIO.getIO().emit(username, { gameOptions });
      socketIO.getIO().emit(opponent, { gameOptions });
      return;
    }
    if (activeGames[gameId].count >= 20) {
      playingUsers.pop(username, opponent);
      let gameOptions = {
        message: `${activeGames[gameId].opponent} lost the game`,
        status: 0
      }
      delete activeGames[gameId];
      socketIO.getIO().emit(username, { message: null, options: gameOptions });
      socketIO.getIO().emit(opponent, { message: null, options: gameOptions });
      return;
    }
    const formattedMessage = formatMessage(newGameObj.sender, newGameObj.message);
    socketIO.getIO().emit(opponent, { message: formattedMessage });
    return responseObj
  } catch (error) {
    console.log('Error playing game', error)
    throw error;
  }
}

/**   
 * Disconnect a user play
 * @param username 
 * @returns status - Object
*/
const onDisconnect = async ({ username }) => {
  let responseObj = responseBuilder();
  try {
    gameUsers.pop(username);
    playingUsers.pop(username);
    socketIO.getIO().emit('allUsersOnline', [...gameUsers]);
    responseObj = responseBuilder(true, gameUsers);
    return responseObj
  } catch (error) {
    console.log('Error disconnecting user', error)
    throw error;
  }
}



module.exports = { gamePlay, getOnlineUsers, playUser, onDisconnect }