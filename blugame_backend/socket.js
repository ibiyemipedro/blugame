let io;
module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["custom-header"],
        credentials: true
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Websocket not initialized.');
    }
    return io;
  }
}