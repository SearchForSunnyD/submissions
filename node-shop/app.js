const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const itemRoutes = require('./itemRoutes')

app.use(express.json());

app.use('/items', itemRoutes)

app.use(function (req, res) {
  return new ExpressError('Not Found', 404)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

module.exports = app;
