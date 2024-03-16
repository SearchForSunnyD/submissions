const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("Partial sql update", function () {
  const schema = {
    a: "1",
    b: "2",
    c: "3",
  };
  const data = {
    a: "alpha",
    b: "bravo",
    c: "charlie",
  };

  test("works", () => {
    res = sqlForPartialUpdate(data, schema);

    expect(res).toEqual({
      setCols: '"1"=$1, "2"=$2, "3"=$3',
      values: ["alpha", "bravo", "charlie"],
    });
  });

  test("error if no data", () => {
    try {
      res = sqlForPartialUpdate({}, schema);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.status).toBe(400);
      expect(err.message).toBe("No data");
    }
  });
  test("error if data missing", () => {
    try {
      res = sqlForPartialUpdate({ a: "1" }, schema);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.status).toBe(400);
      expect(err.message).toBe("No data");
    }
  });
});
