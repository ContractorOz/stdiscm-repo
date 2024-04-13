/* eslint-disable indent */
const Article = require("../models/Article");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const {
  identifyFavoriteArticles,
  getArticles,
  listYears,
  listKeywords,
  voteArticle,
  identifyArticlesFromUnsuspended,
} = require("../utils/helpers");


async function deleteArticleArticle(req, res) {
  await Article.findByIdAndDelete(req.params.id);
  return res.redirect("/");
  // res.status(200).json({ success: true });
}

async function searchArticles(req, res) {
  try {
    const {q, year, keywords, page } = req.query;

    const years = Array.isArray(year) ? year : [year];
    const keys = Array.isArray(keywords) ? keywords : [keywords];


    const { docs, totalPages } = await getArticles({q, years, keys, page });

    
    // const nonSuspendedUsers = await User.find({suspended: false });
    // const userIds = nonSuspendedUsers.map(user => user._id);
    // const articles = await Article.find({ author: { $in: userIds } });



    // const articles = await Article.find();
    //problem occurs if I show all articles ^, but this (bottom) works
    const articles1 = await identifyFavoriteArticles(req.session.user, docs);

    const articles = await identifyArticlesFromUnsuspended(req.session.user, docs);


    console.log(articles);

    const yearList = await listYears();

    const keyList = await listKeywords();

    //TODO: only show the list of the query
    // console.log(yearList);
    // console.log(keyList);

    console.log("Keywords picked: "+keywords);
    console.log(req.query); 

    // console.log(articles);

    litType= [["canon-divergence","Canon Divergence"],
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



    return res.render("articles", {
      litType: litType,
      title: "Articles",
      articles: articles1, //problem here, sa hbs, di makuha cuz ndi daw parent lah
      isArticle: true,
      totalPages,
      docs: docs,
      yearList,
      keyList,
    });
  } catch (err) {
    console.log(err);
  }
}

async function addArticle(req, res) {
  
  //this is to check if we got keywords (genre thing)
  const { q, year, keywords} = req.query;
  console.log(q);

  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    try {
      const { title, author, abstract, keywords, body } =
        req.body;
      const article = {
        title: title,
        // authors: authors.split(","),
        author: req.session.user.username, //the author automatically becomes the current user's username
        abstract: abstract,
        publicationDate: new Date(),  //date today
        keywords: keywords.split(","),
        // articleFile: req.file.location,
        body: body,
      };
      console.log("Adding new book:" + article);
      const newArticle = new Article({ ...article });

      await newArticle.save();
      req.flash(
        "success_msg",
        "You have successfully uploaded your article. Please wait for the moderator to approve your article."
      );
      return res.status(200).send({ errors: [], success: true });
    } catch (err) {
      console.log(err);
    }
  }
  const messages = errors.array();
  return res.status(400).send({ errors: messages, success: false });
}

async function toggleFeaturedArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    article.featured = !article.featured;
    article.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
}

async function addComment(req, res) {
  const currUserId = req.session.user?._id;
  if (!currUserId) {
    return res
      .status(401)
      .send({ success: false, message: "User not logged in" });
  }
  const user = await User.findById(currUserId);
  const article = await Article.findById(req.params.id);
  const msg = req.body.comment_content;

  try {
    await Article.findByIdAndUpdate(
      article,
      {
        $push: {
          comments: {
            commenter: currUserId,
            name: user.username,
            msg: msg,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    );

    req.flash("success_msg", "You have successfully commented.");
    return res.redirect("/article/" + req.params.id);
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(req, res) {
  const currUserId = req.session.user?._id;
  if (!currUserId) {
    return res
      .status(401)
      .send({ success: false, message: "User not logged in" });
  }
  // const user = await User.findById(currUserId);
  const article = await Article.findById(req.params.id);

  //get the index of the comment to update
  let i = 0;
  let found = false;
  while (!found) {
    if (req.body.btn == article.comments[i]._id) {
      found = true;
    } else {
      i++;
    }
  }
  try {
    var dump = article.comments;
    dump.splice(i, 1);

    await Article.findByIdAndUpdate(
      article,
      {
        comments: dump,
      },
      { new: true }
    );

    //if user go back to article page,
    //if mod go back to http://localhost:3000/moderator/article/640af07f89c536cb37480250
    if (req.session.user.role == "user") {
      return res.redirect("/article/" + req.params.id);
    } else {
      return res.redirect("/moderator/article/" + req.params.id);
    }
  } catch (err) {
    console.log(err);
  }
}

async function editCommentDone(req, res) {
  const currUserId = req.session.user?._id;
  if (!currUserId) {
    return res
      .status(401)
      .send({ success: false, message: "User not logged in" });
  }
  // const user = await User.findById(currUserId);
  const article = await Article.findById(req.params.id);

  //get the index of the comment to update
  let i = 0;
  let found = false;
  while (!found) {
    if (req.body.btn == article.comments[i]._id) {
      found = true;
    } else {
      i++;
    }
  }
  var replacement = {
    commenter: article.comments[i].commenter,
    msg: req.body.comment_content,
    _id: article.comments[i]._id,
  };
  try {
    var dump = article.comments;
    dump.splice(i, 1, replacement);
    // console.log(dump)

    await Article.findByIdAndUpdate(
      article,
      {
        comments: dump,
      },
      { new: true }
    );

    return res.redirect("/article/" + req.params.id);
  } catch (err) {
    console.log(err);
  }
}
async function toggleVote(req, res) {
  try {
    const { id } = req.params;
    const { method } = req.body;
    const article = await Article.findById(id);
    const currUser = req.session.user;

    const user = await User.findById(currUser._id);

    voteArticle(method, article, user, id);

    user.save();
    article.save();
    req.session.user = user;

    return res.status(200).json({
      success: true,
      upvotes: article.upvotes,
      downvotes: article.downvotes,
      message: "",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      upvotes: null,
      downvotes: null,
      message: err,
    });
  }
}

module.exports = {
  searchArticles,
  addArticle,
  toggleFeaturedArticle,
  addComment,
  deleteComment,
  editCommentDone,
  toggleVote,
  deleteArticleArticle,
};
