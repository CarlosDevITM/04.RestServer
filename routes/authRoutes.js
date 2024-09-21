const { Router } = require("express");
const authController = require("../controllers/authControllers");
const { loginValidations } = require("../validators/loginValidator");
const { googleValidators } = require("../validators/googleValidations");

const router = Router();

router.post("/login", loginValidations, authController.login);

router.post("/google", googleValidators, authController.googleSignIn);

module.exports = router;
//googleValidators
