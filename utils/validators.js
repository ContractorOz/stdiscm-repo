const { body, check } = require("express-validator");
const DOIValidator = body("citationInfo")
  .trim()
  .custom((value) => {
    // eslint-disable-next-line quotes
    const doiRegex = '(10[.][0-9]{2,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)';
    const pattern = new RegExp(
      "^(http(s)?\\://)?(dx\\.)?doi\\.org/" + doiRegex + "$"
    );

    return value.match(pattern);
  })
  .withMessage("Please enter a valid DOI");
const fileValidator = check("file")
  .custom((value, { req }) => {
    if (req.file.mimetype === "application/pdf") {
      return ".pdf";
    }
    return false;
  })
  .withMessage("Please only submit pdf documents.");

const loginValidators = [
  body("email").isEmail().withMessage("Please Provide a valid Email"),
  body("password").notEmpty().withMessage("Please Provide a password"),
];

const registerValidators = [
  body("email").trim().isEmail().withMessage("Please Provide a valid Email"),
  body("firstName").trim().notEmpty().withMessage("First Name is required"),
  body("lastName").trim().notEmpty().withMessage("Last Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("Confirm Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
];

const articleValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("authors").trim().notEmpty().withMessage("Authors are required"),
  body("date").trim().notEmpty().withMessage("Publication date is required"),
  body("keywords").trim().notEmpty().withMessage("Keywords are required"),
  body("abstract").trim().notEmpty().withMessage("Abstract is required"),
  DOIValidator,
  fileValidator,
];

const editAccountValidators = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
];

module.exports = {
  loginValidators,
  registerValidators,
  articleValidators,
  editAccountValidators,
};
