const express = require("express");
const {
  getUserById,
  getAllUsers,
  updateUser,
  updateProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const userRouter = express.Router();

//Get user by id
userRouter.get("/:id", authMiddleware, getUserById);

//Get all users
userRouter.get("/", authMiddleware, getAllUsers);

//Update user
userRouter.put("/update/:id", authMiddleware, updateUser);

//Update user's own profile
userRouter.put("/update", authMiddleware, updateProfile);

//Export router
module.exports = userRouter;
