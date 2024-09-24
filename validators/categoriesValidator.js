const { check } = require("express-validator");
const { findErrors } = require("../helpers/validateHelper");

const nameValidations = check("name", "Name is required").not().isEmpty();

const categoriesValidations = [nameValidations, findErrors];
module.exports = { categoriesValidations };
