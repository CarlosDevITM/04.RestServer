const validateFileHelper = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).send("No files were uploaded.");
  }
  next();
};

module.exports = {
  validateFileHelper,
};
