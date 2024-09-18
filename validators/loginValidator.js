const { check } = require("express-validator");

const { findErrors } = require("../helpers/validateHelper");
const { login } = require("../controllers/authControllers");

const emailValidations = check("email")
  .not()
  .isEmpty()
  .withMessage("El email es obligatorio")
  .bail()
  .isEmail()
  .withMessage("El email debe estar en formato algo@example.algo");

const passwordValidations = check("password")
  .not()
  .isEmpty()
  .withMessage("La contraseña es obligatoria")
  .bail()
  .isLength({ min: 8 })
  .withMessage("La contraseña debe ser mínimo de 8 caracteres");

const loginValidations = [emailValidations, passwordValidations, findErrors];

module.exports = { loginValidations };
