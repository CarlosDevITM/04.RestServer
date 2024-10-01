console.log("Chat INDEX");
//Validate if token user is correct
let user = null;
let socket = null;

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
  const socket = io({
    extraHeaders: { token: localStorage.getItem("manualToken") },
  });
};

const main = async () => {
  const result = validateJWT();
};
main();

// const socket = io();
