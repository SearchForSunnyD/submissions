const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const { mean, mode, median, convert } = require("./helpers");

app.use(function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "There is not a query of nums delimited with ', '",
      400,
    );
  }

  try {
    req.nums = convert(req.query.nums);
    next();
  } catch (error) {
    next(new ExpressError(error.message, 400));
  }
});

app.get("/mean", function (req, res) {
  let result = {
    operation: "mean",
    result: mean(req.nums),
  };

  return res.send(result);
});

app.get("/all", function (req, res) {
  let result = {
    operation: "all",
    mean: mean(req.nums),
    median: median(req.nums),
    mode: mode(req.nums),
  };

  return res.send(result);
});

app.get("/median", function (req, res) {
  let result = {
    operation: "median",
    result: median(req.nums),
  };

  return res.send(result);
});

app.get("/mode", function (req, res) {
  let result = {
    operation: "mode",
    result: mode(req.nums),
  };

  return res.send(result);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
