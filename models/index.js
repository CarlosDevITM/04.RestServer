const Role = require("./rol");
const User = require("./user");
const Categories = require("./categories");
const Products = require("./products");

module.exports = {
  ...Role,
  ...User,
  ...Categories,
  ...Products,
};
