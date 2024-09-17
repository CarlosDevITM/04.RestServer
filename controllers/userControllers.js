const { response, query } = require("express");
//BCRYPT
const bcrypt = require("bcrypt");

//Users Model
const Users = require("../models/user.js");

const userGet = (req, res = response) => {
  res.json({
    type: "Get",
  });
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

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    id: id,
  });
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
