const { response } = require("express");
const bcrypt = require("bcrypt");

const Users = require("../models/user");

const authController = {};

authController.login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    console.log(email);
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User incorrect",
      });
    }
    //Verificar si el usuario está activo en a DB
    if (user.status === false) {
      return res.status(400).json({
        msg: "User not authenticated status:false",
      });
    }
    //Verificar la contraseña.
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Password incorrect",
      });
    }
    res.json({
      msg: "Login Success",
    });
  } catch (error) {
    return res.status(500).send("El error es" + error.message);
  }
};

module.exports = authController;
