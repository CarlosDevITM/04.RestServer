const { Router } = require("express");
const authController = require("../controllers/authControllers");
const { loginValidations } = require("../validators/loginValidator");
const { googleValidators } = require("../validators/googleValidations");

const { validateJWT } = require("../helpers/");

const router = Router();

router.post("/login", loginValidations, authController.login);

router.post("/google", googleValidators, authController.googleSignIn);

router.get("/googleConf", (req, res) => {
  return res.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  });
});

router.get("/", validateJWT, authController.renewToken);

module.exports = router;
//googleValidators
