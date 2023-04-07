const { getTokenFromHeader, verifyToken } = require("../utils/jwtUtils");
const Post = require("../models/Post");
const isAuthorOfPost = async (req, res, next) => {
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
    const { id } = req.params;
    const post = await Post.findById(id).exec();
    if (post) {
      if (post.author.toString() === decoded.id) {
        next();
      } else {
        return res.status(401).json({
          responseCode: "01",
          responseMessage: "Unauthorized",
        });
      }
    } else {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseCode: "99",
      responseMessage: "Internal server error",
    });
  }
};

module.exports = isAuthorOfPost;
