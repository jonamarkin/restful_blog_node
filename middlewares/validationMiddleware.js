const { body, validationResult } = require("express-validator");

const validateInput = (validations) => {
  return [
    ...validations,
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      return res.status(400).json({
        responseCode: "99",
        responseMessage: "Validation error",
        responseData: errors.array(),
      });
    },
  ];
};

const createPostValidations = [
  body("title")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must be between 5 and 50 characters."),
  body("content")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters."),
];

const registerUserValidations = [
  body("firstName")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters."),
  body("lastName")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters."),
  body("email").isEmail().withMessage("Email must be a valid email address."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
];

module.exports = {
  validateInput,
  createPostValidations,
  registerUserValidations,
};
