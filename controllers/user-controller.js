const User = require("../models/User");
const Article = require("../models/Article");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 8;
const { validationResult } = require("express-validator");
const {
  checkIfFavorited,
  getArticles,
  identifyFavoriteArticles,
} = require("../utils/helpers");
const { default: mongoose } = require("mongoose");

async function createUser(req, res) {
  const errors = validationResult(req);
  const user = req.body;
  console.log(user)
  if (errors.isEmpty()) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
      req.flash(
        "success_msg",
        "You have successfully registered. You can now Log in"
      );
      return res.status(200).send({ errors: [], success: true });
    } catch (err) {
      return res.status(409).send({
        errors: [{ param: "email", msg: "User already exists. Please Log in" }],
        success: false,
      });
    }
  } else {
    const messages = errors.array();
    return res.status(400).send({ errors: messages, success: false });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (errors.isEmpty()) {
    try {
      const user = await User.findOne({ email: email });
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        if (user.suspended) {
          //user is suspended
          return res.status(400).send({
            errors: [
              {
                param: "email",
                msg: "Account suspended. Cannot log in.",
              },
            ],
            success: false,
          });
        } else {
          delete user.password;
          req.session.user = user;
          return res.status(200).send({ errors: [], success: true });
        }
      } else {
        return res.status(400).send({
          errors: [
            {
              param: "password",
              msg: "Password does not match",
            },
          ],
          success: false,
        });
      }
    } catch (err) {
      return res.status(400).send({
        errors: [{ param: "email", msg: "User does not exist" }],
        success: false,
      });
    }
  } else {
    const messages = errors.array();
    return res.status(400).send({ errors: messages, success: false });
  }
}

function logout(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (!err) {
        res.clearCookie("loginSession");
        res.redirect("/login");
      }
    });
  }
}

// async function toggleFavoriteArticles(req, res) {
//   const currUser = req.session.user;
//   let method = "";
//   if (currUser) {
//     try {
//       const user = await User.findById(currUser._id);
//       const article = await Article.findById(req.body.articleId);
//       if (!checkIfFavorited(article, user.favorites)) {
//         method = "add";
//         user.favorites.push(article);
//       } else {
//         method = "remove";
//         user.favorites = user.favorites.filter((item) => {
//           return item._id.toString() !== article._id.toString();
//         });
//       }
//       user.save();
//       req.session.user = user;
//       return res.status(200).json({ success: true, method });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return res.redirect("/login");
// }

async function editAccount(req, res) {
  const currUserId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array();
    return res.status(400).send({ errors: messages, success: false });
  }

  if (currUserId) {
    try {
      await User.findByIdAndUpdate(currUserId, { ...req.body }, { new: true });
      return res.status(200).send({ errors: [], success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        errors: [
          {
            param: "email",
            msg: "There seems to be an error in editing the user",
          },
        ],
        success: false,
      });
    }
  }
  // return res.redirect("/login");
}

async function deleteAccount(req, res) {
  await User.findByIdAndDelete(req.params.id);
  // console.log("user selected is: "+req.params.id)
  console.log("in deleteAccount");

  if (req.session) {
    //console.log(req.session.user._id)

    {
      req.session.destroy((err) => {
        if (!err) {
          res.clearCookie("loginSession");
          return res.redirect("/");
        }
      });
    }
  }
}

async function viewUser(req, res) {
  const { id } = req.params;
  const { q, page } = req.query;
  if (req.session.user._id === id) {
    return res.redirect("/");
  }
  const user = await User.findById(id).lean();
  const { docs, totalPages } = await getArticles({
    q,
    years: [undefined],
    page,
    // filter: {
    //   $in: user.favorites?.map((fav) => mongoose.Types.ObjectId(fav._id)) ?? [],
    // },
    limit: 3,
  });

  // const favorites = await identifyFavoriteArticles(req.session.user, docs);

  return res.render("user", {
    title: "User",
    user,
    totalPages,
    route: `/users/${user._id}`,
  });
}


module.exports = {
  createUser,
  login,
  logout,
  editAccount,
  deleteAccount,
  viewUser,
  // followUser, //not needed
};
