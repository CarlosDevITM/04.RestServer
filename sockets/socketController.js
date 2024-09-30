const { Socket } = require("socket.io");

const socketController = (socket = new Socket()) => {
  console.log(`Client connected to ${socket.id}`);
};

module.exports = {
  socketController,
};
