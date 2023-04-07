const express = require("express");
const {
  getUserById,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const userRouter = express.Router();

//Get user by id
userRouter.get("/:id", getUserById);

//Get all users
userRouter.get("/", getAllUsers);

//Update user
userRouter.put("/update/:id", updateUser);

//Update user's own profile
userRouter.put("/update", updateUser);

//Export router
module.exports = userRouter;
