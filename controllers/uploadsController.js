const { response } = require("express");
const path = require("path");
const fs = require("fs");

const { uploadFileHelper } = require("../helpers/uploadFileHelper");
const { User } = require("../models");

const uploadFile = async (req, res = response) => {
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

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({
          msg: `It doesn´t exists an user with ${id}`,
        });
      break;
    case "products":
      model = await Products.findById(id);
      if (!model)
        return res.status(400).json({
          msg: `It doesn´t exists a product with ${id}`,
        });
      break;
    default:
      `${collection} is not added yet, please add it`;
  }

  //Clear previous files
  if (model.image) {
    console.log(model.image);
    const imagePath = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );
    console.log(imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  const name = await uploadFileHelper(req.files, ["jpg", "png"], collection);

  model.image = name;
  await model.save();

  res.json(model);
};

const getImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({
          msg: `It doesn´t exists an user with ${id}`,
        });
      break;

    case "products":
      model = await Products.findById(id);
      if (!model)
        return res.status(400).json({
          msg: `It doesn´t exists a product with ${id}`,
        });
      break;

    default:
      `${collection} is not added yet, please add it`;
  }

  //Clear previous files
  if (model.image) {
    console.log(model.image);
    const imagePath = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }
  const defaultImagePath = path.join(__dirname, "../img", "notFound.jpg");
  res.sendFile(defaultImagePath);
};

module.exports = { uploadFile, updateImage, getImage };
