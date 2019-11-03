const puppeteer = require("puppeteer");
const { fileWriter, delay } = require("../utils");

const websiteURL = "https://www.ceneo.pl/";

module.exports = scraper = async searchTerm => {
  switch (websiteURL) {
    case "https://www.ceneo.pl/":
      const result = await getCeneoData(websiteURL, searchTerm);
      return result;
    default:
      return "Sorry, I can't help you";
  }
};

async function getCeneoDataFromSinglePage(page, url) {
  let recursiveResult = [];
  let pageNumber = 0;

  const getListingData = async () => {
    try {
      const searchResultUrl = `${url};0020-30-0-0-${pageNumber}.htm`;
      const response = await page.goto(searchResultUrl);
      await delay(3000);

      console.log(response.status());

      const Listings = await page.$$(
        ".category-list-body > div > div > .cat-prod-row-content > .cat-prod-row-desc"
      );

      const ListingData = Listings.map(async offer => {
        const title = await offer.$eval(
          "strong.cat-prod-row-name",
          el => el.innerText
        );

        const score = await offer.$eval("span.prod-review", el =>
          el.innerText.slice(1, 4)
        );

        const opinions = await offer.$eval("span.prod-review", el =>
          el.innerText.slice(10, 13)
        );

        return {
          title,
          score,
          opinions
        };
      });

      const singlePageData = await Promise.all(ListingData);
      recursiveResult = recursiveResult.concat(singlePageData);

      return singlePageData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  let singlePageData = await getListingData();

  while (singlePageData.length !== 0) {
    pageNumber++;
    singlePageData = await getListingData();
  }

  return recursiveResult;
}

async function getCeneoData(websiteURL, searchTerm) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(websiteURL);

    await page.focus("#form-head-search-q"); // focus on the input field
    await page.keyboard.sendCharacter(searchTerm); // input your search query
    await page.keyboard.press("Enter"); // pressing Enter to initiate search
    await page.waitForNavigation(); // waiting for navigation i.e. until page loads

    const searchResultUrl = page.url();

    const data = await getCeneoDataFromSinglePage(page, searchResultUrl);
    await page.close();

    fileWriter(data, "result.json");

    return data;
  } catch (error) {
    return "Upss, something went wrong";
  }
}
