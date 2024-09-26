const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFileHelper = (files, allowedExtensions = [], filesFolder = "") => {
  return new Promise((resolve, reject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { myFile } = files;
    //Split value by dots
    const splitedName = myFile.name.split(".");

    //extension of our file
    const fileExtension = splitedName[splitedName.length - 1];
    console.log(fileExtension);

    //Validate the file extension
    if (!allowedExtensions.includes(fileExtension)) {
      return reject(
        `Please provide an allowed fileExtension of these list ${allowedExtensions}`
      );
    }

    //Temporal name
    const temporalName = uuidv4() + "." + fileExtension;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      filesFolder,
      "/",
      temporalName
    );
    console.log(uploadPath);

    myFile.mv(uploadPath, (error) => {
      if (error) return resolve(error);

      resolve(temporalName);
    });

    // // Use the mv() method to place the file somewhere on your server
    // myFile.mv(uploadPath, (err) => {
    //   if (err) return res.status(500).send(err.message);
  });
};

module.exports = {
  uploadFileHelper,
};
