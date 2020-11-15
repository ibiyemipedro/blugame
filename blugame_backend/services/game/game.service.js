const Game = require('../../models/game.model');
const User = require('../../models/user.model');
const socketIO = require('../../socket');
const { responseBuilder, formatMessage } = require('../../utils/utils');
const gameUsers = [];
const playingUsers = [];
const activeGames = {};

/**
 * Play game user
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
 * Play game user
 * @param username 
 * @param opponent 
 * @param question 
 * @returns status and gameId - Object
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
 * Play game user
 * @param gameId 
 * @param username 
 * @param opponent 
 * @param reply 
 * @returns status - Object
*/
const gamePlay = async ({ gameId, username, opponent, reply }) => {
  try {
    console.log('Game Play details: ', gameId, username, opponent, reply);
    const newGameObj = {
      status: true,
      opponent: opponent,
      sender: username,
      message: reply
    }
    if (activeGames[gameId].opponent == username) {
      activeGames[gameId].count += 1
    }
    if (activeGames[gameId].question == reply) {
      playingUsers.pop(username, opponent);
      delete activeGames[gameId];
      let updatedGameObj = {
        status: false,
        opponent: opponent,
        sender: username,
        message: `${opponent} has won the game`
      }
      socketIO.getIO().emit(`${gameId}WIN`, updatedGameObj);
      return;
    }
    if (activeGames[gameId].count >= 20) {
      playingUsers.pop(username, opponent);
      delete activeGames[gameId];

      let updatedGameObj = {
        status: false,
        opponent: opponent,
        sender: username,
        message: `${opponent} lost the game`
      }
      console.log(updatedGameObj);
      socketIO.getIO().emit(`${gameId}GAMEOVER`, updatedGameObj);
      return;
    }
    const formattedMessage = formatMessage(newGameObj.sender, newGameObj.message);
    socketIO.getIO().emit(opponent, formattedMessage);

    return {
      success: true,
      data: null
    }
  } catch (error) {
    console.log('Error playing game', error)
    throw error;
  }
}


const saveScore = async ({ username, score }) => {
  // try {
  //   const userGame = await Game.findOne({
  //     where: {
  //       username: username
  //     }
  //   });
  //   if (userGame.score > score) {
  //     return true
  //   }
  //   const game = new Game({ username, score });
  //   const result = await game.save();
  //   if (!result) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // } catch (error) {
  //   console.log('Error saving score', error)
  //   throw error;
  // }
}



module.exports = { gamePlay, getOnlineUsers, playUser, saveScore }