const Categories = require("../models/categories");

const categoriesController = {};
categoriesController.getAllCategories = async (req, res) => {
  //Pagination
  const { from, limit } = req.query;
  try {
    const response = await Categories.find()
      .skip(Number(from))
      .limit(Number(limit));
    if (!response) {
      return res.status(401).json({
        msg: `It couldnt bring all categories from getAllCategories`,
      });
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.error(`${error.message} from getAllCategories`);
    res.status(500).json({
      error: error.message,
    });
  }
};

categoriesController.getOneCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Categories.findOne({ _id: id });
    if (!response) {
      return res.status(401).json({
        msg: `It couldn´t get a single catefory from getOneCategory`,
      });
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(`${error.message} from getOneCategorie`);
    res.status(500).json({
      error: error.message,
    });
  }
};

categoriesController.postCategory = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase();

    //Validate that a category cannot be twice
    const categoryDBexists = await Categories.findOne({ name });

    if (categoryDBexists) {
      return res.status(400).json({
        msg: `The category ${name} already exists`,
      });
    }

    //Data to save
    const data = {
      name,
      user: req.user._id,
    };

    const category = new Categories(data);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

categoriesController.putCategory = async (req, res) => {
  const id = req.params.id;
  // const { __v, _id, status, ...name } = req.body;
  const name = req.body;

  try {
    const response = await Categories.findByIdAndUpdate(id, name);
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

categoriesController.deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Categories.findByIdAndUpdate(id, { status: false });
    if (!response) {
      return res.status(401).json({
        msg: "It couldn´t delete a category from deleteCategory",
      });
    }

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(`${error.message} from deleteCategory`);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = categoriesController;
