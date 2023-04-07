const { getTokenFromHeader, verifyToken } = require("../utils/jwtUtils");

//Check if user is authenticated
const authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({
        responseCode: "01",
        responseMessage: "Unauthorized",
      });
    }
    const decoded = verifyToken(token);
    if (decoded instanceof Error) {
      return res.status(401).json({
        responseCode: "01",
        responseMessage: "Unauthorized",
      });
    }
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

module.exports = authMiddleware;
