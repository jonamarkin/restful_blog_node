const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  getTokenFromHeader,
  verifyToken,
} = require("../utils/jwtUtils");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

//Get user by id
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    //Check if user exists
    const userExists = await User.findById(id);
    if (userExists) {
      return res.status(200).json({
        responseCode: "00",
        responseMessage: "User found",
        responseData: userExists,
      });
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "User not found",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      responseCode: "00",
      responseMessage: "Users found",
      responseData: users,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Update user
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    //Check if user exists
    const userExists = await User.findById(id);
    if (userExists) {
      //Check if user found is the same as the user in the token
      const token = getTokenFromHeader(req);
      const decoded = verifyToken(token);
      if (decoded.id === id) {
        //Update user
        const user = await User.findByIdAndUpdate(
          id,
          {
            firstName,
            lastName,
            email,
          },
          { new: true }
        );
        return res.status(200).json({
          responseCode: "00",
          responseMessage: "User updated successfully",
          responseData: user,
        });
      } else {
        return res.status(401).json({
          responseCode: "01",
          responseMessage: "Unauthorized",
        });
      }
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "User not found",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};
