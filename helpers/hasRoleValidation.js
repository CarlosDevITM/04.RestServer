const { response } = require("express");

const isAdminValidation = (req, res, next) => {
  const { rol, name } = req.user;

  if (rol !== "admin") {
    return res.status(401).json({
      message: `Error: ${name} is not admin`,
    });
  }

  next();
};
//...something = array to get all parameters

const hasRole = (...roles) => {
  //We are returning a function.
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  hasRole,
};
