const { check } = require("express-validator");

const { findErrors } = require("../helpers/validateHelper");

const googleValidations = check(
  "id_token",
  "The id_token of google its required"
)
  .not()
  .isEmpty();

const googleValidators = [googleValidations, findErrors];

module.exports = { googleValidators };
