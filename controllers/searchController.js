const { response } = require("express");
const { User, Products } = require("../models");
const { ObjectId } = require("mongoose").Types;
const availableCollections = ["users", "products", "categories", "roles"];

//Search USers
const searchUsers = async (searchKey = "", res = response) => {
  const isMongoID = ObjectId.isValid(searchKey);
  //Search by MongoID
  if (isMongoID) {
    const user = await User.findById(searchKey);
    return res.json({
      results: user ? [user] : [],
    });
  }

  //Search by Name
  const regex = new RegExp(searchKey, "i");
  const response = await User.find({
    $or: [{ name: regex }, { email: regex }],
    status: true,
  });

  res.json({ results: response });
};

const searchProducts = async (searchKey = "", res = response) => {
  const isMongoID = ObjectId.isValid(searchKey);
  //Search by MongoID
  if (isMongoID) {
    const products = await Products.findById(searchKey);
    return res.json({
      results: products ? [products] : [],
    });
  }

  //Search by Name
  const regex = new RegExp(searchKey, "i");
  const response = await Products.find({ name: regex });

  res.json({ results: response });
};

const searchCollections = (req, res = response) => {
  const { collection, searchKey } = req.params;

  if (!availableCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The available collections are ${availableCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(searchKey, res);
      break;
    case "products":
      searchProducts(searchKey, res);
      break;
    case "categories":
      break;
    default:
      return res.status(500).json({
        msg: "The following collection is not available right now",
      });
  }
};

module.exports = {
  searchCollections,
};
