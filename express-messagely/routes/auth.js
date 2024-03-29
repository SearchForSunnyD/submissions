const express = require("express");

const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const router = new express.Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (await User.get(username)) {
      if (await User.authenticate(username, password)) {
        User.updateLoginTimestamp(username);

        let token = jwt.sign({ username }, SECRET_KEY);

        return res.json({ token });
      }
    }
    return next({ status: 400, message: "Incorrect Username/Password" });
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    User.register({ username, password, first_name, last_name, phone });
    User.updateLoginTimestamp(username);

    let token = jwt.sign({ username }, SECRET_KEY);

    return res.json({ token });
  } catch (e) {
    const err = new ExpressError(e);
    return next(err);
  }
});

module.exports = router;
