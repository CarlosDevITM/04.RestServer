const { Router } = require("express");
const authController = require("../controllers/authControllers");
const { loginValidations } = require("../validators/loginValidator");

const router = Router();

router.post("/login", loginValidations, authController.login);

module.exports = router;
