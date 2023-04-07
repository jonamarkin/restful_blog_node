const Post = require("../models/Post");
const authMiddleware = require("../middlewares/authMiddleware");
const isAuthorOfPost = require("../middlewares/isAuthorOfPost");

//Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().exec();
    //Check if there are posts
    if (posts.length === 0) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No posts found",
      });
    }

    return res.status(200).json({
      responseCode: "00",
      responseMessage: "Posts retrieved successfully",
      responseData: posts,
    });
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Get post by id
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    //Check if post exists
    const postExists = await Post.findById(id).exec();

    if (postExists) {
      return res.status(200).json({
        responseCode: "00",
        responseMessage: "Post found",
        responseData: postExists,
      });
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Create post
const createPost = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.userId;
  try {
    const newPost = new Post({
      title,
      body,
      author: userId,
    });
    const savedPost = await newPost.save();
    return res.status(201).json({
      responseCode: "00",
      responseMessage: "Post created successfully",
      responseData: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    //Check if post exists
    const postExists = await Post.findById(id).exec();
    if (postExists) {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          body,
        },
        { new: true }
      ).exec();
      return res.status(200).json({
        responseCode: "00",
        responseMessage: "Post updated successfully",
        responseData: updatedPost,
      });
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    //Check if post exists
    const postExists = await Post.findById(id).exec();
    if (postExists) {
      await Post.findByIdAndDelete(id).exec();
      return res.status(200).json({
        responseCode: "00",
        responseMessage: "Post deleted successfully",
      });
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
