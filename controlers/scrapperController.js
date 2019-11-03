const url = require("url");
const mongoose = require("mongoose");

const scraper = require("../scraper/");
const Result = mongoose.model("results");

exports.getResults = async (req, res, next) => {
  try {
    const reqUrl = url.parse(req.url, true);

    const searchTerm = reqUrl.query.searchTerm;
    const data = await scraper(searchTerm);
    const jsonData = JSON.stringify(data);

    await Result.insertMany(data, (error, docs) => {
      if (error) {
        console.error(error);
      }
    });

    res.status(201).json(jsonData);
  } catch (err) {
    next(err);
  }
};
