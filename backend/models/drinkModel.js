const { Schema, model } = require("mongoose");

const drinkSchema = Schema({
  title: {
    type: String,
    required: [true, "title field is required"],
  },
  value: {
    type: Number,
    default: 100,
  },
  price: {
    type: Number,
    default: 500,
  },
  adult: {
    type: Boolean,
    required: [true, "adult field is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = model("drinks", drinkSchema);
