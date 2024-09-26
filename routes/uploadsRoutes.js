const { Router } = require("express");
const {
  uploadFile,
  updateImage,
  getImage,
  updateImageCloudinary,
} = require("../controllers/uploadsController");
const { validations } = require("../validators/updateUploadsValidations");

const { validateFileHelper } = require("../helpers/validateFile");

const router = Router();

router.post("/", validateFileHelper, uploadFile);

router.put(
  "/:collection/:id",
  validateFileHelper,
  validations,
  updateImageCloudinary
);

router.get("/:collection/:id", validations, getImage);

module.exports = router;
