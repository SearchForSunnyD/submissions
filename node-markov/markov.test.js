const { MarkovMachine } = require("./markov");

describe("Testing the Markov Machine", function () {
  let str = "a b c d";
  let str2 = "a a a a";

  let mm = new MarkovMachine(str);
  let mm2 = new MarkovMachine(str2);

  test("this.chains is the correct length", function () {
    expect(Object.keys(mm.chains).length).toEqual(4);
    expect(Object.keys(mm2.chains).length).toEqual(1);
  });

  test("a chain is the correct length", function () {
    expect(mm.chains["a"].length).toEqual(1);
    expect(mm2.chains["a"].length).toEqual(4);
  });

  test("this.words is the correct length", function () {
    expect(Object.keys(mm.words).length).toEqual(4);
    expect(Object.keys(mm2.words).length).toEqual(4);
  });

  test("verify getRand returns a random item", function () {
    expect(mm2.getRand(str2.split(" "))).toEqual("a");
  });

  test("verify makeText never goes above limiter", function () {
    for (let i = 0; i < 100; i++) {
      expect(mm2.makeText(1).length).toBeLessThan(2);
    }
  });
});
