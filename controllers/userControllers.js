const { response } = require("express");
//BCRYPT
const bcrypt = require("bcrypt");

//Users Model
const Users = require("../models/user.js");

const userGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  try {
    const getUsers = await Users.find().skip(Number(from)).limit(Number(limit));
    res.json({
      getUsers,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const userPost = async (req, res = response) => {
  try {
    //const queryParams = req.query;
    //const { name = "No name", age = 18 } = req.query;
    const body = req.body;
    const user = new Users(body);

    //TODO:Verify if email exists

    //TODO: Hash Password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(body.password, salt);

    //TODO: Save into DB
    await user.save();

    res.json({
      user,
    });
  } catch (error) {
    console.error(`Error al intentar crear usuario debido a ${error.message}`);
    res.status(400).send("User Already Exists");
  }
};

const userPut = async (req, res = response) => {
  try {
    const id = req.params.id;
    //ALL WE WONT UPDATE          //ALL WE GONNA UPDATE
    const { _id, password, google, email, ...user } = req.body;

    //TODO: Validar
    if (password) {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);
    }

    const userDB = await Users.findByIdAndUpdate(id, user);

    res.json({
      userDB,
    });
  } catch (error) {
    console.error(`Error al actualizar usuario debido a: ${error.message}`);
  }
};

const userPatch = (req, res = response) => {
  res.send("Hello Patch");
};

const userDelete = (req, res = response) => {
  res.send("Hello Delete");
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
