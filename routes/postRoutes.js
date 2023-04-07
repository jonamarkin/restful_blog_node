const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const isAuthorOfPost = require("../middlewares/isAuthorOfPost");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  validateInput,
  createPostValidations,
} = require("../middlewares/validationMiddleware");

const postRouter = express.Router();

//Get all posts
postRouter.get("/", authMiddleware, getAllPosts);

//Get post by id
postRouter.get("/:id", authMiddleware, isAuthorOfPost, getPostById);

//Create post
postRouter.post(
  "/create",
  authMiddleware,
  validateInput(createPostValidations),
  createPost
);

//Update post
postRouter.put("/update:id", authMiddleware, isAuthorOfPost, updatePost);

//Delete post
postRouter.delete("/delete/:id", authMiddleware, isAuthorOfPost, deletePost);

//Export router
module.exports = postRouter;
