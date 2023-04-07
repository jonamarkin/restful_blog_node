const mongoose = require("mongoose");

const User = require("./User");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    body: {
      type: String,
      required: [true, "Please provide a body"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, virtuals: true }
);

module.exports = mongoose.model("Post", PostSchema);
