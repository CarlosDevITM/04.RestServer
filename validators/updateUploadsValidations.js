const { check } = require("express-validator");
const { findErrors } = require("../helpers/validateHelper");
const {
  allowedCollectionsHelper,
} = require("../helpers/allowedCollectionsHelper");

const idValidations = check("id")
  .not()
  .isEmpty()
  .withMessage("El nombre es un campo obligatorio")
  .bail()
  .isMongoId()
  .withMessage("El id debe ser un id de Mongo");

//Custom

const collectionValidations = check("collection")
  .not()
  .isEmpty()
  .withMessage("The collection is required")
  .bail()
  .custom((c) => allowedCollectionsHelper(c, ["users", "products"]));

const validations = [idValidations, collectionValidations, findErrors];

module.exports = { validations };
