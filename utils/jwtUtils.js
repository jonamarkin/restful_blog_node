const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return new Error(err);
    }
    return decoded;
  });
};

module.exports = { generateToken, getTokenFromHeader, verifyToken };
