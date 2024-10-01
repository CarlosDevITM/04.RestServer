const jwt = require("jsonwebtoken");
//uid: UserID
const Users = require("../models/user.js");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("I was not able to create a new token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJwt = async (token = "") => {
  try {
    if (token.lenght < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await Users.findById({ _id: uid });

    if (user && user.status === true) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  generateJWT,
  checkJwt,
};
