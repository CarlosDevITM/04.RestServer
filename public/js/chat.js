console.log("Chat INDEX");
//Validate if token user is correct
let user = null;
let socket = null;

//Chat html
const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const usersList = document.querySelector("#usersList");
const messagesList = document.querySelector("#messagesList");
const btnLogOut = document.querySelector("#btnLogOut");

const validateJWT = async () => {
  const token = localStorage.getItem("manualToken") || "";

  if (token.length <= 10) {
    throw new Error("The token is not a valid token");
  }

  try {
    const resp = await fetch("http://localhost:8000/api/auth/", {
      headers: { token: token },
    });

    const { user: userDB, token: tokenDB } = await resp.json();

    console.log(userDB, tokenDB);
    user = userDB;
    document.title = user.name;

    await socketConnection();
  } catch (error) {
    console.log({ error: error });
  }
};

const socketConnection = async () => {
  //Starting connection with server
  socket = io({
    extraHeaders: { token: localStorage.getItem("manualToken") },
  });

  socket.on("connect", () => console.log("Server Connected"));

  socket.on("disconnect", () => console.log("Server Disconnected"));

  socket.on("get-messages", () => {});

  socket.on("active-users", () => {});

  socket.on("private-messages", () => {});
};

const main = async () => {
  const result = validateJWT();
};
main();

// const socket = io();
