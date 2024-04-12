/* eslint-disable indent */
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const viewRoutes = require("./routes/view-routes");
const articleRoutes = require("./routes/article-routes");
const userRoutes = require("./routes/user-routes");
const moderatorRoutes = require("./routes/moderator-routes");
const hbsHelpers = require("./utils/hbsHelpers");

const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "/views/layouts"),
  partialsDir: path.join(__dirname, "/views/partials"),
  helpers: hbsHelpers,
});

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/stdiscm-db"; //TODO: change to prod once deployed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store:
      process.env.NODE_ENV === "test"
        ? ""
        : MongoStore.create({
            mongoUrl:
              "mongodb://rootFinal:rootroot@final-db-cluster.cluster-cpuaqu8wsgkj.ap-southeast-2.docdb.amazonaws.com:27017/?tls=true&retryWrites=false&directConnection=true",
            tlsCAFile: "global-bundle.pem",
          }),
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //TODO: add secure:true on deployment
  })
);
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  next();
});
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.userId = req.session.user._id;
    res.locals.currUser = req.session.user;
  }
  next();
});
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(express.static("public"));

app.use(viewRoutes);
app.use("/articles", articleRoutes);
app.use("/users", userRoutes);
app.use("/moderator", moderatorRoutes);

module.exports = { app, DB_URI };
