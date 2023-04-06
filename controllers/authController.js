const User = require("../models/User/User");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  getTokenFromHeader,
  verifyToken,
} = require("../utils/jwtUtils");
const apiError = require("../utils/apiError");

//Register a new user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //Check if user already exists
    const userExists = User.findOne({ email });
    if (userExists) {
      next(apiError("User already exists", 400));
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //Generate token
    const token = generateToken(user._id);

    //Send response
    res.status(201).json({
      responseCode: "00",
      responseMessage: "User created successfully",
      responseData: {
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(apiError(error.message, error.statusCode));
  }
};

//Login a user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      next(apiError("User does not exist", 400));
    }
  } catch (error) {}
};

//Export controller
module.exports = { register, login };
