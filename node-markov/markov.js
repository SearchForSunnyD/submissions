class MarkovMachine {
  constructor(text) {
    const words = text.split(/[ \r\n]+/).filter((c) => c !== "");
    this.words = words;
    this.makeChains();
  }

  makeChains() {
    this.chains = {};

    const uniqueWords = new Set(this.words);

    uniqueWords.forEach((word) => {
      let arr = [];

      let index = this.words.indexOf(word);

      while (index !== -1) {
        arr.push(this.words[index + 1]);
        index = this.words.indexOf(word, index + 1);
      }

      Object.assign(this.chains, { [word]: arr.length > 0 ? arr : [undefined] });
    });
  }

  makeText(numWords = 100) {
    let arr = [];
    for (let i = 0; i < numWords; i++) {
      let keyWord = this.getRand(Object.keys(this.chains));
      let word = this.getRand(this.chains[keyWord]);

      if (word === undefined) {
        break;
      } else {
        arr.push(word);
      }
    }

    return arr.join(" ");
  }

  getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

module.exports = { MarkovMachine };
