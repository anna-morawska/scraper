const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultsSchema = new Schema({
  title: String,
  score: String,
  opinions: String
});

mongoose.model("results", resultsSchema);
