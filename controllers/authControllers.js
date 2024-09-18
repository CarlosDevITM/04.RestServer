const { response } = require("express");

const authController = {};

authController.login = (req, res = response) => {
  res.json({
    msg: "Login Success",
  });
};

module.exports = authController;
