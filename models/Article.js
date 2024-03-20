const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
// const Comment = require("../models/Comment");

const { Schema } = mongoose;

const Article = new Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  authors: [String],
  articleFile: {
    type: String,
  },
  comments: [
    {
      commenter: String,
      msg: String,
    },
  ],
  publicationDate: {
    type: Date,
  },
  keywords: {
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["rejected", "pending", "approved"],
    default: "pending",
  },
  citationInfo: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

Article.plugin(aggregatePaginate);

module.exports = mongoose.model("Article", Article);
