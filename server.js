require("dotenv").config();
const { app, DB_URI } = require("./app");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("You are listening at port " + PORT);
    });
  });
