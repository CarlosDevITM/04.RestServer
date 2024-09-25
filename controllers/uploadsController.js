const path = require("path");
const { response } = require("express");

const uploadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { myFile } = req.files;
  const uploadPath = path.join(__dirname, "/uploads", myFile.name);

  // Use the mv() method to place the file somewhere on your server
  myFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err.message);

    res.json("File uploaded to!" + uploadPath);
  });
};

module.exports = { uploadFile };
