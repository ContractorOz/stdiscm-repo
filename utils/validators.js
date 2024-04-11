const { body, check } = require("express-validator");
// const DOIValidator = body("citationInfo")
//   .trim()
//   .custom((value) => {
//     // eslint-disable-next-line quotes
//     const doiRegex = '(10[.][0-9]{2,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)';
//     const pattern = new RegExp(
//       "^(http(s)?\\://)?(dx\\.)?doi\\.org/" + doiRegex + "$"
//     );

//     return value.match(pattern);
//   })
//   .withMessage("Please enter a valid DOI");
const fileValidator = check("file")   //TODO: modify this so that it gets the text from inside the docx
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
  body("username").trim().notEmpty().withMessage("Username is required"),
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
  // body("author").trim().notEmpty().withMessage("Author is required"),
  // body("date").trim().notEmpty().withMessage("Publication date is required"),
  // body("keywords").trim().notEmpty().withMessage("Keywords are required"),
  body("body").trim().notEmpty().withMessage("Story's body is required"),
  body("abstract").trim().notEmpty().withMessage("Summary is required"),

  // DOIValidator,
  // fileValidator, //todo add this back for when doc file import is working naaa
];

const editAccountValidators = [
  body("username").notEmpty().withMessage("Username is required"),
];

module.exports = {
  loginValidators,
  registerValidators,
  articleValidators,
  editAccountValidators,
};
