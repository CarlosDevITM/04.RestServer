const { response } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFileHelper");

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedImage = await uploadFileHelper(req.files, [
    "jpg",
    "png",
    "jpeg",
  ]);

  res.json({
    image: uploadedImage,
  });
};

module.exports = { uploadFile };
