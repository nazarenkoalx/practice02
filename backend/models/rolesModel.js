const { Schema, model } = require("mongoose");

const rolesSchema = Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
  },
});

module.exports = model("roles", rolesSchema);
