const mongoose = require("mongoose");

const { Schema } = mongoose;

const Comment = new Schema({
	commenter: String,
	// name: String,
	msg: String,
});


//i ended up not using this in the end, but just in case I'll leave this here
module.exports = mongoose.model("Comment", Comment);
