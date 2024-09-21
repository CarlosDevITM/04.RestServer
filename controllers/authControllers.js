const { response } = require("express");
const bcrypt = require("bcrypt");

const Users = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const authController = {};

authController.login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
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

    //Generar JSON WEB TOKEN.
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send("El error es" + error.message);
  }
};

authController.googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  if (!id_token) {
    return res.json({
      Error: "No hay token",
    });
  }

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await Users.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "A",
        img,
        google: true,
        rol: "user",
      };
      user = new Users(data);
      await user.save();
    }

    //If user is on DB
    if (!user.status) {
      return res.status(401).json({
        msg: "User not valid",
      });
    }

    //Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      id_token,
      user,
      token,
    });
  } catch (error) {
    return res.json({
      msg: "User does not exist",
      id_token,
    });
  }
};

module.exports = authController;
