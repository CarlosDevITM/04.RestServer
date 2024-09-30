const { response, request } = require("express");
const jwt = require("jsonwebtoken");
//Importing this to use some mongo functions
const Users = require("../models/user");
const helpers = require("./validateJwtHelper");
const validateUserExistsDB = require("./validateJwtHelper");

const validateJWT = (req, res, next) => {
  //USER DELETE REQUEST
  validateUserHttpActions(req, res, "DELETE", next);

  //USER POST REQUEST
  validateUserHttpActions(req, res, "POST", next);

  //USER UPDATE REQUEST
  validateUserHttpActions(req, res, "PUT", next);

  //USER GET REQUEST
  validateUserHttpActions(req, res, "GET", next);
};

const validateUserHttpActions = async (req, res, method, next) => {
  if (req.method == method && (await validateUserExistsDB(req, res)) == true)
    next();
};

module.exports = {
  validateJWT,
};
