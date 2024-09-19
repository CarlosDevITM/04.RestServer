const isAdminValidation = (req, res, next) => {
  console.log(req.user);

  const { rol, name } = req.user;

  if (rol !== "admin") {
    return res.status(401).json({
      message: `Error: ${name} is not admin`,
    });
  }

  next();
};

module.exports = {
  isAdminValidation,
};
