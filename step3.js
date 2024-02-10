const process = require("process");
const fs = require("fs");
const axios = require("axios");

function cat(path, outputFile) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      if (outputFile) {
        writeToFile(outputFile, data);
      } else {
        console.log(data);
      }
    }
  });
}

function webCat(url, outputFile) {
  axios
    .get(url)
    .then((resp) => {
      if (outputFile) {
        writeToFile(outputFile, resp.data);
      } else {
        console.log(resp.data);
      }
    })
    .catch((error) => {
      console.error(`Error fetching ${url}: ${error.message}`);
      process.exit(1);
    });
}

function writeToFile(outputFile, content) {
  fs.writeFile(outputFile, content, (err) => {
    if (err) {
      console.error(`Error writing to ${outputFile}: ${err}`);
      process.exit(1);
    } else {
      console.log(`Data written to ${outputFile}`);
    }
  });
}

function processArguments(args) {
  let outputFile = null;

  for (let i = 2; i < args.length; i++) {
    if (args[i] === "--out" && i + 1 < args.length) {
      outputFile = args[i + 1];
      i++;
    } else {
      let pathOrUrl = args[i];
      if (pathOrUrl.slice(0, 4) === "http") {
        webCat(pathOrUrl, outputFile);
      } else {
        cat(pathOrUrl, outputFile);
      }
    }
  }
}

processArguments(process.argv);

module.exports = { cat: cat, webCat: webCat };
