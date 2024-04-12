require("dotenv").config();
const { app } = require("./app");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose
  .connect(
    // "mongodb://rootFinal:rootroot@final-db-cluster.cluster-cpuaqu8wsgkj.ap-southeast-2.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true",
    "mongodb+srv://ghaelkun:PLzFSMoo1gv9NK2l@cluster0.39r8h30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      // tlsCAFile: "global-bundle.pem",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("You are listening at port " + PORT);
    });
  });
