const { response } = require("express");

const userGet = (req, res = response) => {
  res.send("Hello Get");
};

const userPost = (req, res = response) => {
  res.send("Hello Post");
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
