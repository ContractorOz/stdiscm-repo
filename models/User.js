const mongoose = require("mongoose");
const { Schema } = mongoose;
const Article = require("./Article").schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [Article],
    required: false,
    default: [],
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  following: {
    type: [String],
    required: false,
    default: [],
  },
  suspended: {
    type: Boolean,
    default: false,
  },
  upvotes: {
    type: [String],
    required: false,
    default: [],
  },
  downvotes: {
    type: [String],
    required: false,
    default: [],
  },
});

User.plugin(aggregatePaginate);
module.exports = mongoose.model("User", User);
