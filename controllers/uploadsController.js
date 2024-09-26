const { response } = require("express");
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

  const name = await uploadFileHelper(req.files, ["jpg", "png"], collection);

  model.image = name;
  await model.save();

  res.json(model);
};

module.exports = { uploadFile, updateImage };
