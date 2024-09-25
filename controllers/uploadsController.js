const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

const uploadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { myFile } = req.files;
  //Split value by dots
  const cuttedName = myFile.name.split(".");

  //extension of our file
  const fileExtension = cuttedName[cuttedName.length - 1];
  console.log(fileExtension);

  //Validate the fileExtension
  const allowedExtensions = ["png", "jpg", "jpeg", "gif"];

  if (!allowedExtensions.includes(fileExtension)) {
    return res.json({
      error: `Please provide an allowed fileExtension of these list ${allowedExtensions}`,
    });
  }

  //Temporal name
  const temporalName = uuidv4() + "." + fileExtension;

  const uploadPath = path.join(__dirname, "/uploads", temporalName);

  // Use the mv() method to place the file somewhere on your server
  myFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err.message);

    res.json("File uploaded to!" + uploadPath);
  });
};

module.exports = { uploadFile };
