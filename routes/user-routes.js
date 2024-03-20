const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  logout,
  toggleFavoriteArticles,
  editAccount,
  deleteAccount,
  viewUser,
  followUser,
} = require("../controllers/user-controller");
const {
  loginValidators,
  registerValidators,
  editAccountValidators,
} = require("../utils/validators");
const { userOnlyRoute } = require("../middleware/routeAuthentication");

router.post("/register", registerValidators, createUser);
router.post("/login", loginValidators, login);
router.get("/logout", logout);
router.post("/favorites", toggleFavoriteArticles);
router.put("/edit-account/:id", editAccountValidators, editAccount);
router.delete("/delete/:id", deleteAccount);
router.get("/:id", userOnlyRoute, viewUser);
router.put("/follow/:id", userOnlyRoute, followUser);

module.exports = router;
