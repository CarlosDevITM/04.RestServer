const { validationResult } = require("express-validator");

const findErrors = (req, res, next) => {
  try {
    //Checks req.body by parameter "req" and throw() is throwing an error or if there's no error, doesn't throw anything
    validationResult(req).throw();
    //Go to the next middleware or function
    return next();
  } catch (errors) {
    //Shows an error if there's one
    return res.status(403).send(errors);
  }
};

module.exports = { findErrors };
