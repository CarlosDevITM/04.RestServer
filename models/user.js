//Schema para controlar acciones de mongo como borrar etc.
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  image: {
    type: String,
  },

  rol: {
    type: String,
    required: [true, "Rol is required"],
    enum: ["admin", "user"],
  },

  status: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.udi = _id;
  return user;
};

module.exports = model("Users", userSchema, "users");
