const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((data) => {
//     // don't know what userNewUrlParser does
//     console.log("connected to Database");
//   })
//   .catch((err) => {
//     console.log("ERROR CONNECTING TO Mongo! " + err);
//   });

const app = express();
app.use(express.json()); // this is needed for fetch calls from app
app.use(express.urlencoded({ extended: true })); // don't know if extended needs to be true

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../fcc/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../fcc/build", "index.html"));
  });
}
app.listen(process.env.PORT || port, () =>
  console.log(`server is running on ${port}`)
);
