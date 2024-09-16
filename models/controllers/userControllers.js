const { response, query } = require("express");

const userGet = (req, res = response) => {
  //const queryParams = req.query;
  const { name = "No name", age = 18 } = req.query;

  res.json({
    //queryParams,
    name,
    age,
  });
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
