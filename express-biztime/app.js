/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError")

const companies = require("./routes/companies");
const invoices = require("./routes/invoices");

app.use(express.json());

/** route handler */

app.use("/companies", companies);
app.use("/invoices", invoices);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});


module.exports = app;
