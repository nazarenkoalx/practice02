const { Schema, model } = require("mongoose");

const userSchema = Schema({
  email: {
    type: String,
    required: [true, "email field is required"],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
  name: {
    type: String,
    default: "Sandra Bullock <3",
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: "roles",
    },
  ],
});

module.exports = model("users", userSchema);
