const { Products } = require("../models");
const productsController = {};

productsController.getProducts = async (req, res) => {
  try {
    const response = await Products.find();
    //If there´s no response
    if (!response) {
      return res.status(400).json({
        msg: "Error trying to get products",
      });
    }

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ msg: `${error.message}` });
  }
};

productsController.getOneProduct = async (req, res) => {
  try {
  } catch (error) {}
};

productsController.postProducts = async (req, res) => {
  try {
    const { status, user, category, ...products } = req.body;
    console.log({ prod: products });
    const data = {
      name: products.name.toUpperCase(),
      user: req.user._id,
      price: products.price,
      description: products.description,
      category,
    };
    const product = new Products(data);
    await product.save();

    res.status(201).json({
      product,
    });
  } catch (error) {
    res.status(400).json({ msg: `${error.message}` });
    console.log(error);
  }
};

productsController.putProducts = async (req, res) => {
  const id = req.params.id;
  // const { __v, _id, status, ...name } = req.body;
  const { status, user, _id, ...product } = req.body;
  console.log({ prod: product });

  try {
    const response = await Products.findByIdAndUpdate(id, product);
    if (!response) {
      return res.status(401).json({
        msg: "It couldn´t update a category from putCategory",
      });
    }

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(`${error.message} from putCategory`);
    res.status(500).json({
      error: error.message,
    });
  }
};

productsController.deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Products.findByIdAndUpdate(id, { status: false });

    if (!response) {
      return res.status(403).json({
        error: "Product not found",
      });
    }

    res.status(203).json({
      msg: "Product deleted successfully",
      response,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
    console.log(error);
  }
};

module.exports = productsController;
