const express = require("express");
const router = express.Router();
const {
  searchArticles,
  addArticle,
  toggleFeaturedArticle,
  toggleVote,
  deleteArticleArticle,
} = require("../controllers/article-controller");

const {
  userOnlyRoute,
  moderatorOnlyRoute,
} = require("../middleware/routeAuthentication");

const { articleValidators } = require("../utils/validators");

const upload = require("../middleware/multer");

router.get("/search", userOnlyRoute, searchArticles);

router.post(
  "/add-article",
  upload.single("file"),
  articleValidators,
  addArticle
);

router.put("/toggle-featured/:id", moderatorOnlyRoute, toggleFeaturedArticle);
router.put("/toggle-vote/:id", toggleVote);

router.get("/article/delete/:id", deleteArticleArticle);

module.exports = router;
