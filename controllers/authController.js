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

//Register a new user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //Check if user already exists
    const userExists = await User.findOne({ email }).exec();
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "User already exists",
      });
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

    //Send response
    return res.status(201).json({
      responseCode: "00",
      responseMessage: "User created successfully",
      responseData: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

//Login a user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Check if user exists
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      //Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExists.password
      );
      if (isPasswordCorrect) {
        //Generate token
        const token = generateToken(userExists._id);
        //Send response
        return res.status(200).json({
          responseCode: "00",
          responseMessage: "Login successful",
          responseData: {
            token,
            user: userExists,
          },
        });
      } else {
        logger.error("Incorrect password");
        return res.status(400).json({
          responseCode: "01",
          responseMessage: "Invalid credentials",
        });
      }
    } else {
      logger.error("User does not exist");
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "User does not exist",
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

//Export controller
module.exports = { register, login };
