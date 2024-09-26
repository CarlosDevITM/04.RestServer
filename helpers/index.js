const generateJWT = require("./generateJWT");
const googleVerify = require("./google-verify");
const hasRoleValidation = require("./hasRoleValidation");
const uploadFileHelper = require("./uploadFileHelper");
const validateHelper = require("./validateHelper");
const validateJWT = require("./validateJWT");
const validateFile = require("./validateFile");

module.exports = {
  ...generateJWT,
  ...googleVerify,
  ...hasRoleValidation,
  ...uploadFileHelper,
  ...validateHelper,
  ...validateJWT,
  ...validateFile,
};
