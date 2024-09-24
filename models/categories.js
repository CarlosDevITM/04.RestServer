//Schema para controlar acciones de mongo como borrar etc.
const { Schema, model } = require("mongoose");

const categorieSchema = Schema({
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
});

categorieSchema.methods.toJSON = function () {
  const { __v, _id, ...categorie } = this.toObject();
  categorie.udi = _id;
  console.log(categorie);
  return categorie;
};

module.exports = model("Categories", categorieSchema, "categories");
