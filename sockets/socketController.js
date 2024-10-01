const { Socket } = require("socket.io");
const { checkJwt } = require("../helpers/generateJWT");
const ChatMessages = require("../models/chatMessages");

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  console.log(`Client connected to ${socket.id}`);
  // console.log(socket.handshake.headers["token"]);
  const userToken = socket.handshake.headers["token"];
  console.log({ token: userToken });
  const user = await checkJwt(userToken);

  if (!user) {
    return socket.disconnect();
  }
  //Add connected user
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArray());

  console.log("Se conectó", user.name);

  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArray());
  });
};

module.exports = {
  socketController,
};
