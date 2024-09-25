//Schema para controlar acciones de mongo como borrar etc.
const { Schema, model } = require("mongoose");

const productsSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    default: true,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },

  description: { type: String },
  available: { type: Boolean, default: true },
});

productsSchema.methods.toJSON = function () {
  const { __v, ...categorie } = this.toObject();
  console.log(categorie);
  return categorie;
};

module.exports = model("Products", productsSchema, "products");
