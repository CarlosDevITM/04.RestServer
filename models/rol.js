const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

// roleSchema.methods.toJSON = function () {
//   const { ...roles } = this.toObject();
//   console.log(roles);
//   return roles;
// };

module.exports = model("Role", roleSchema);
