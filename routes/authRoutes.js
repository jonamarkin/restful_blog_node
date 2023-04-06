const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  validateInput,
  registerUserValidations,
} = require("../middlewares/validationMiddleware");
const authRouter = express.Router();

//Register a new user
authRouter.post("/register", validateInput(registerUserValidations), register);

//Login a user
authRouter.post("/login", login);

//Export router
module.exports = authRouter;
