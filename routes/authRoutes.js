const express = require("express");
const { register, login } = require("../controllers/authController");
const authRouter = express.Router();

//Register a new user
authRouter.post("/register", register);

//Login a user
authRouter.post("/login", login);

//Export router
module.exports = authRouter;
