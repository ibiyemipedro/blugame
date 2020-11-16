const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpException = require('../../utils/classes/httpException');
const User = require('../../models/user.model');
const config = require('../../config/config');
const { responseBuilder } = require('../../utils/utils');

/**
 * Registers a user
 * @param username 
 * @param password
 * @param flag optional
 * @returns status - Object
*/
const authUser = async ({ username, password, flag }) => {
  let responseObj = responseBuilder();
  try {
    if (flag === 'register') {
      console.log('reg here')
      let existingUser = await User.findOne({ username: username });
      if (existingUser) {
        responseObj = responseBuilder(false, null, 'Username already used');
        return responseObj
      }
      const hashedPassword = await bcrypt.hash(password, config.salt);
      const user = new User({ username, password: hashedPassword });
      const result = await user.save();
      if (!result) {
        responseObj = responseBuilder(false, null, 'Registration Failed');
        return responseObj
      }
      responseObj = responseBuilder(true, null, 'Registration successful');
      return responseObj
    } else {
      let user = await User.findOne({ username: username });
      if (!user) {
        responseObj = responseBuilder(false, null, 'Username not found');
        return responseObj
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        responseObj = responseBuilder(false, null, 'Wrong password');
        return responseObj
      }
      const token = jwt.sign({
        username: user.username
      }, config.secretKey, {
        expiresIn: '24h'
      });
      if (!token) {
        const error = new HttpException(401, 'Error occurred, could not create token.', null);
        throw error;
      }
      responseObj = responseBuilder(true, {
        token,
        user: user
      }, 'Login successful');
      return responseObj
    }
  } catch (error) {
    console.log('signup error', error)
    throw error;
  }
}

module.exports = { authUser }