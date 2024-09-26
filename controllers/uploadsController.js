const { response } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFileHelper");

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    const uploadedImage = await uploadFileHelper(
      req.files,
      ["jpg", "png", "jpeg", "txt", "md"],
      "text"
    );

    res.json({
      image: uploadedImage,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { uploadFile };
