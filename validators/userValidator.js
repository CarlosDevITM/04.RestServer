const { check } = require("express-validator");
const { findErrors } = require("../helpers/validateHelper");
const Role = require("../models/rol");

const nameValidations = check("name", "El nombre es un campo obligatorio")
  .not()
  .isEmpty()
  .withMessage("El nombre es un campo obligatorio");

const emailValidations = check("email", "El email es un campo obligatorio")
  .not()
  .isEmpty()
  .withMessage("El email es un campo obligatorio")
  .bail()
  .isEmail()
  .withMessage("El email debe estar en formato algo@example.algo");

const passwordValidations = check("password")
  .exists()
  .not()
  .isEmpty()
  .withMessage("Password must exists")
  .bail()
  .isLength({ min: 6 })
  .withMessage("Password length must be at least 6 characters");

const rolValidations = check("rol").custom(async (role = "") => {
  const isRoleExisting = await Role.findOne({ rol: role });

  if (!isRoleExisting) {
    throw new Error("Role does not exist");
  }
});

const validations = [
  nameValidations,
  passwordValidations,
  emailValidations,
  rolValidations,
  findErrors,
];

module.exports = { validations };
