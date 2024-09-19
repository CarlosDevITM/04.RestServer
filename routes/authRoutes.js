const { Router } = require("express");
const authController = require("../controllers/authControllers");
const { loginValidations } = require("../validators/loginValidator");
const { isAdminValidation } = require("../helpers/isAdminValidation");

const router = Router();

router.post("/login", loginValidations, authController.login);

module.exports = router;
