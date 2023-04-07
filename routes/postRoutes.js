const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const postRouter = express.Router();

//Get all posts
postRouter.get("/", getAllPosts);

//Get post by id
postRouter.get("/:id", getPostById);

//Create post
postRouter.post("/create", createPost);

//Update post
postRouter.put("/update:id", updatePost);

//Delete post
postRouter.delete("/delete/:id", deletePost);

//Export router
module.exports = postRouter;
