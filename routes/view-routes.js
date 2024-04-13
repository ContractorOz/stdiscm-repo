const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Article = require("../models/Article");
const User = require("../models/User");
// const Comment = require("../models/Comment");

const {
  identifyFavoriteArticles,
  getPaginatedUsers,
} = require("../utils/helpers");

const {
  addComment,
  deleteComment,
  editCommentDone,
} = require("../controllers/article-controller");

const {
  requireLogin,
  alreadyLoggedIn,
  userOnlyRoute,
} = require("../middleware/routeAuthentication");

router.get("/", [userOnlyRoute], async (req, res) => {
  const docs = await Article.find({ featured: true, approved: true }).lean();

  const articles = await identifyFavoriteArticles(req.session.user, docs);

  return res.render("index", {
    title: "Home",
    articles: articles,
  });
});

router.get("/login", [alreadyLoggedIn], (req, res) => {
  return res.render("login", { title: "Login" });
});

router.get("/register", [alreadyLoggedIn], (req, res) => {
  return res.render("register", { title: "Register" });
});

router.get("/account/:id", [requireLogin, userOnlyRoute], async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  const { username } = user;
  const name = `${username}`;

  //TODO FIND ARTICLES BY ANOTHER author
  //name = "username" ng user = "author" ng article
  //
  //then render the page also with article
  const articles = await Article.find({ author: req.session.user.username }).lean();
  if (articles)
  {
    console.log(articles);
    return res.render("account", { title: name, user, articles });

  }

  return res.render("account", { title: name, user });
});

router.get("/add-article", (req, res) => {
  if(req.session.user){ //if logged in
    const layout = req.session.user.role === "user" ? "main.hbs" : "mod.hbs";
    const isModView = req.session.user.role === "user" ? false : true;
    console.log("In /add-article... Logged in as " + req.session.user.email + " / @" + req.session.user.username);
    
    genreList= [["canon-divergence","Canon Divergence"],
            ["canon-compliance","Canon Compliance"],
            ["char-death","Character Death"],
            ["poetry","Poetry"],
            ["dabble","Dabble"],
            ["songfic","Song Fic"],
            ["horror","Horror"],
            ["romance","Romance"],
            ["after-canon","After Canon"],
            ["alternate","Alternate Universe (AU)"],
            ["hurtno","Hurt/No Comfort"],
            ["hurt","Hurt/Comfort"],
            ["angst","Angst"],
            ["tragedy","Tragedy"],
            ["freestyle","Freestyle"],
            ["script","Script"]]

    return res.render("add-paper",
      {
        genreList: genreList,
        title: "Add Article",
        author: req.session.user.username,
        layout, isModView });
  }
  else{
    return res.render("login", {
      msg: "You must be logged in to add books."});
  }
});

router.get("/article/:id", [userOnlyRoute], async (req, res) => {
  const doc = await Article.findById(req.params.id).lean();

  // const comments_temp = [];
  let dump = {};
  // const comm = doc.comments; //array of comments
  let loggedIn = false;
  let suspendedName = "Suspended User";
  let suspendedMsg = "This user is suspended.";
  const article = await identifyFavoriteArticles(req.session.user, [doc]);
  if (req.session.user) {
    loggedIn = true;
  }

  // try {
  //   if (comm) {
  //     for (let i = 0; i < comm.length; i++) {
  //       const user = await User.findById(doc.comments[i].commenter).lean();
  //       if (user._id === req.session?.user?._id) {
  //         dump = {
  //           commenter: user._id.toString(),
  //           name: "@"+user.username,
  //           msg: doc.comments[i].msg,
  //           _id: doc.comments[i]._id,
  //         };
  //       } else if (user.suspended) {
  //         dump = {
  //           commenter: user._id.toString(),
  //           name: suspendedName,
  //           msg: suspendedMsg,
  //           _id: doc.comments[i]._id,
  //         };
  //       } else {
  //         dump = {
  //           commenter: user._id.toString(),
  //           name: "@"+user.username,
  //           msg: doc.comments[i].msg,
  //           _id: doc.comments[i]._id,
  //         };
  //       }
  //       comments_temp.push(dump);
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  return res.render("article-page", {
    title: "Article",
    isLoggedIn: loggedIn,
    article: article[0],
    // comments: doc.comments,
    // comments_temp: comments_temp,
    sess: req.session?.user?._id ?? undefined,
  });
});

router.post("/article/:id/comment/new", requireLogin, addComment);
router.post("/article/:id/comment/edit", requireLogin, async (req, res) => {
  const article = await Article.findById(req.params.id).lean();

  let found = false;
  let i = 0;
  while (!found) {
    if (req.body.btn == article.comments[i]._id) {
      found = true;
    } else {
      i++;
    }
  }

  return res.render("edit-comment", {
    title: "Edit Comment",
    article: article,
    comment: article.comments[i],
  });
});

router.post("/article/:id/comment/edit-done", requireLogin, editCommentDone);
router.post("/article/:id/comment/delete", requireLogin, deleteComment);

// router.get("/favorites", [requireLogin, userOnlyRoute], async (req, res) => {
//   const favorites = req.session.user.favorites;
//   return res.render("favorites", { title: "Favorites", favorites });
// });

router.get("/people", [requireLogin, userOnlyRoute], async (req, res) => {
  const { page, q } = req.query;

  const { users, totalPages } = await getPaginatedUsers(
    q,
    [mongoose.Types.ObjectId(req.session.user._id)],
    page
  );
  return res.render("people", {
    title: "Discover people",
    users,
    totalPages,
    inAccount: false,
    route: "/people",
  });
});

// router.get(
//   "/following-list",
//   [requireLogin, userOnlyRoute],
//   async (req, res) => {
//     const { page, q } = req.query;
//     const user = req.session.user;

//     const { users, totalPages } = await getPaginatedUsers(
//       q,
//       user.following.map((item) => mongoose.Types.ObjectId(item)),
//       page,
//       "$in"
//     );

//     return res.render("people", {
//       title: "Following list",
//       users,
//       totalPages,
//       inAccount: true,
//       route: "/following-list",
//     });
//   }
// );

module.exports = router;
