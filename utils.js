const fs = require("fs");

module.exports = {
  fileWriter: async (fileData, name) => {
    const data = JSON.stringify(fileData);
    fs.writeFileSync(`./${name}`, data, { encoding: "utf-8" });
  },
  delay: async delayTime => {
    return new Promise((resolve, reject) => setTimeout(resolve, delayTime));
  }
};
