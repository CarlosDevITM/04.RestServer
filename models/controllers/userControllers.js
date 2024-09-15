const { response } = require("express");

const userGet = (req, res = response) => {
  res.send("Hello Get");
};

const userPost = (req, res = response) => {
  //Body que envia el cliente
  // const body = req.body;
  //Desestructurar lo que envia el cliente
  const { nombre, apellido } = req.body;

  res.json({
    //msg: "Post API",
    nombre,
    apellido,
  });
};

const userPut = (req, res = response) => {
  res.send("Hello Put");
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
