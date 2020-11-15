class HttpException extends Error {
  constructor(statusCode, message, data) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
module.exports = HttpException;