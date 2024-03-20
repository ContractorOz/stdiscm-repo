const Article = require("../models/Article");
const User = require("../models/User");
const { getArticles, getPaginatedUsers } = require("../utils/helpers");

async function editAccountMod(req, res) {
  //const currUserId = req.params.id;

  try {
    const user = await User.findById(req.params.id).lean();
    return res.render("moderator/account-edit.hbs", {
      title: "Edit Account",
      user,
      layout: "mod.hbs",
      // user: user,
    });
  } catch (err) {
    console.log(err);

    // return res.redirect("/moderator");
  }
}

async function editAccountDone(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({ errors: [], success: true, user });
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

  //return redirect("/users/list")
}

async function viewArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id).lean();
    if (!article) return res.redirect("/moderator");

    var dump = {}; //will be reasigned
    const comments_temp = [];
    if (article.comments) {
      for (let i = 0; i < article.comments.length; i++) {
        var user = await User.findById(article.comments[i].commenter).lean();
        dump = {
          commenter: user._id,
          name: user.firstName + " " + user.lastName,
          msg: article.comments[i].msg,
          _id: article.comments[i]._id,
        };
        comments_temp.push(dump);
      }
    }

    return res.render("moderator/article-page", {
      title: "Article Request Page",
      article,
      comment: comments_temp,
      comments: article.comments,
      layout: "mod.hbs",
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/moderator");
  }
}

async function listArticles(req, res) {
  try {
    const { q, year, page } = req.query;

    const years = Array.isArray(year) ? year : [year];
    const { docs, totalPages } = await getArticles({ q, years, page });

    return res.render("moderator/article-list", {
      title: "Articles",
      articles: docs,
      isArticle: true,
      totalPages,
      layout: "mod.hbs",
    });
  } catch (err) {
    console.log(err);
  }
}

async function listUsers(req, res) {
  try {
    const { q, page } = req.query;
    // console.log(users);
    const { users, totalPages } = await getPaginatedUsers(q, [], page);

    return res.render("moderator/user-list", {
      title: "Users",
      users,
      layout: "mod.hbs",
      totalPages,
    });
  } catch (err) {
    console.log(err);
  }
}

async function rejectOrApproveArticle(req, res) {
  try {
    await Article.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
}

async function suspendUser(req, res) {
  const user = await User.findById(req.params.id).lean();

  await User.findByIdAndUpdate(req.params.id, {
    suspended: !user.suspended,
  });

  //not reloading
  return res.redirect("/moderator/edit/u/" + user._id);
}

async function deleteArticle(req, res) {
  await Article.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true });
}

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true });
}

//inside user page as mod
async function deleteUserAccount(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.redirect("/moderator/users/list");
}

async function searchArticles(req, res) {
  const { q, year, page, status } = req.query;

  const years = Array.isArray(year) ? year : [year];
  const { docs, totalPages } = await getArticles({ q, years, page, status });

  return res.status(200).json({ articles: docs, totalPages, success: true });
}

async function searchUsers(req, res) {
  const { q, page } = req.query;

  const { users, totalPages } = await getPaginatedUsers(q, [], page);

  return res.status(200).json({ users, totalPages, success: true });
}

module.exports = {
  viewArticle,
  listArticles,
  listUsers,
  rejectOrApproveArticle,
  deleteArticle,
  deleteUser,
  searchArticles,
  editAccountMod,
  editAccountDone,
  searchUsers,
  deleteUserAccount,
  suspendUser,
};
