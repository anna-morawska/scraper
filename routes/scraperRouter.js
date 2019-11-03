const express = require("express");
const scraperRouter = express.Router();
const scrapperController = require("../controlers/scrapperController");

scraperRouter.get("/", scrapperController.getResults);

module.exports = scraperRouter;
