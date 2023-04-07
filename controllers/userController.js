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
    const userExists = await User.findById(id).exec();

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
    const users = await User.find().exec();
    //Check if there are users
    if (users.length === 0) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No users found",
      });
    }

    return res.status(200).json({
      responseCode: "00",
      responseMessage: "Users retrieved successfully",
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

//Update random user
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    //Check if user exists
    const userExists = await User.findById(id).exec();
    if (userExists) {
      //Check if email is already in use
      const isEmailTaken = await User.findOne({ email }).exec();
      if (isEmailTaken) {
        return res.status(400).json({
          responseCode: "01",
          responseMessage: "Email already in use",
        });
      }

      //Update user
      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
        },
        { new: true }
      ).exec();
      return res.status(200).json({
        responseCode: "00",
        responseMessage: "User updated successfully",
        responseData: user,
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

//Update user's own profile
const updateProfile = async (req, res, next) => {
  const userId = req.userId;
  const { firstName, lastName, email } = req.body;
  try {
    //Check if user exists
    const userExists = await User.findById(userId).exec();
    if (userExists) {
      //Check if user found is the same as the user in the token
      const token = getTokenFromHeader(req);
      const decoded = verifyToken(token);
      if (decoded.id === userId) {
        //Check if email is already in use
        const isEmailTaken = await User.findOne({ email }).exec();
        if (isEmailTaken) {
          return res.status(400).json({
            responseCode: "01",
            responseMessage: "Email already in use",
          });
        }
        //Update user
        const user = await User.findByIdAndUpdate(
          userId,
          {
            firstName,
            lastName,
            email,
          },
          { new: true }
        ).exec();
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
    console.log(error);
    logger.error(error);
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Export functions
module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  updateProfile,
};
