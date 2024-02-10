const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function webCat(url) {
  return axios
    .get(url)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(`Error fetching ${url}: ${error.message}`);
      process.exit(1);
    });
}

function cat(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function processArguments(args) {
  let str = "";
  for (let i = 3; i < args.length; i++) {
    let pathOrUrl = args[i];

    str += pathOrUrl.startsWith("http")
      ? await webCat(pathOrUrl)
      : await cat(pathOrUrl);
  }

  const mm = new MarkovMachine(str);

  return mm.makeText();
}

processArguments(process.argv)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
