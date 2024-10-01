const Role = require("./rol");
const User = require("./user");
const Categories = require("./categories");
const Products = require("./products");
const ChatMessages = require("./chatMessages");

module.exports = {
  ...Role,
  ...User,
  ...Categories,
  ...Products,
  ...ChatMessages,
};
