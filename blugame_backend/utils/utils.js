const moment = require('moment');

const responseBuilder = (success, data, message) => {
  return {
    success: success || false,
    data: data || null,
    message: message || ''
  }
}

const formatMessage = (sender, message) => {
  return {
    sender,
    message,
    time: moment().format('h:mm a')
  }
}

module.exports = { responseBuilder, formatMessage }