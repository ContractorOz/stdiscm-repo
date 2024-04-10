const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
// const Comment = require("../models/Comment");

const { Schema } = mongoose;

const Article = new Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {             //summary
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // articleFile: {
  //   type: String,
  // },
  body:{
    type:String,
    required: true,
  },
  comments: [
    {
      commenter: String,
      msg: String,
    },
  ],
  publicationDate: {    //year only
    type: Date,
  },
  keyword: { //genre/tags --> idk if like ao3 edi tags dapat, pero if books genre?
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  // status: {
  //   type: String,
  //   enum: ["rejected", "pending", "approved"],
  //   default: "pending",
  // },
  // citationInfo: {
  //   type: String,
  //   required: true,
  // },
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
