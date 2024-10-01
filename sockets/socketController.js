const { Socket } = require("socket.io");
const { checkJwt } = require("../helpers/generateJWT");

const socketController = async (socket = new Socket()) => {
  // console.log(`Client connected to ${socket.id}`);
  // console.log(socket.handshake.headers["token"]);
  const userToken = socket.handshake.headers["token"];
  console.log({ token: userToken });
  const user = await checkJwt(userToken);

  if (!user) {
    console.log("Error");
    return socket.disconnect();
  }

  console.log("Se conectó", user.name);
};

module.exports = {
  socketController,
};
