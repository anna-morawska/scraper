require("dotenv").config("./env");
require("./models/Result"); // register model

const express = require("express");
const mongoose = require("mongoose");

const scraperRouter = require("./routes/scraperRouter");

const MONGODB_URI = process.env.MONGODB_URI;
const port = 5001;
const app = express();

app.use("/scraper", scraperRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, err => {
  if (err) {
    console.error(error);
  }
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true // remove deprecation warnings
  })
  .catch(error => console.error(error));

mongoose.connection.on("error", err => console.error(err));
mongoose.connection.once("open", function() {
  console.log("Connected");

  mongoose.connection.db
    .listCollections({ name: "results" })
    .next((err, collinfo) => {
      if (collinfo) {
        mongoose.connection.db.dropCollection("results", (err, result) =>
          console.log("Old result collection has been dropped")
        );
      }
    });
});
