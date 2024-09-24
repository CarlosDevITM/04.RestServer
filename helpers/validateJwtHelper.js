const { response, request } = require("express");
const jwt = require("jsonwebtoken");
//Importing this to use some mongo functions
const Users = require("../models/user");

const validateUserExistsDB = async (req = request, res = response) => {
  //Checking the token we´re inserting on deleteToken header petition.
  const token = req.header("token");
  //If there´s no token send an error message.
  if (!token) {
    return res.status(401).json({
      message: "There´s no token to realize an HTTP request",
    });
  }

  try {
    // We desestruct the uid of the user that has a valid token and its key.
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    // The user that is deleting the another user
    const user = await Users.findById(uid);
    if (!user) {
      return res.status(400).send("No existe un usuario en la BD");
    }

    // Adding our user to the object.
    req.user = user;

    // Verify if user exists or is an administrator
    const { status } = user;
    if (status !== true) {
      return res
        .status(401)
        .send("Este usuario no puede realizar dicha acción ");
    }
    return true;
  } catch (error) {
    console.error(error.message);
    res.status(401).json({
      message: "No valid token to delete",
    });
  }
};

module.exports = validateUserExistsDB;
