const express = require("express");
const router = express.Router();
const {
  moderatorOnlyRoute,
  requireLogin,
} = require("../middleware/routeAuthentication");
const { getArticles } = require("../utils/helpers");

const {
  viewArticle,
  listArticles,
  listUsers,
  searchArticles,
  rejectOrApproveArticle,
  deleteArticle,
  deleteUser,
  editAccountMod,
  editAccountDone,
  searchUsers,
  deleteUserAccount,
  suspendUser,
} = require("../controllers/moderator-controller");

router.get("/article/:id", [requireLogin, moderatorOnlyRoute], viewArticle);

router.get("/edit/u/:id", [requireLogin, moderatorOnlyRoute], editAccountMod);

router.put("/suspend/u/:id", [requireLogin, moderatorOnlyRoute], suspendUser);

router.put(
  "/edit/u/:id/done",
  [requireLogin, moderatorOnlyRoute],
  editAccountDone
);

router.get("/articles/list", [requireLogin, moderatorOnlyRoute], listArticles);
router.get(
  "/articles/search",
  [requireLogin, moderatorOnlyRoute],
  searchArticles
);

router.get("/users/search", [requireLogin, moderatorOnlyRoute], searchUsers);

router.get("/users/list", [requireLogin, moderatorOnlyRoute], listUsers);

router.get("/", [requireLogin, moderatorOnlyRoute], async (req, res) => {
  const { q, year, page } = req.query;

  const years = Array.isArray(year) ? year : [year];
  const { docs, totalPages } = await getArticles({
    q,
    years,
    page,
    status: "pending",
  });

  return res.render("moderator/moderator", {
    title: "Moderator",
    layout: "mod.hbs",
    articles: docs,
    totalPages,
  });
});

router.put(
  "/articles/status/:id",
  [moderatorOnlyRoute],
  rejectOrApproveArticle
);

router.delete("/delete/u/:id", [moderatorOnlyRoute], deleteUser);
router.delete("/delete/user/:id", [moderatorOnlyRoute], deleteUserAccount);
router.delete("/articles/delete/:id", [moderatorOnlyRoute], deleteArticle);

module.exports = router;
