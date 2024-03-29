const express = require("express");

const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const ExpressError = require("../expressError");
const router = new express.Router();

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    return res.send(await User.all());
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get(
  "/:username",
  ensureLoggedIn,
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { username } = req.params;
      return res.send(await User.get(username));
    } catch (e) {
      const err = new ExpressError(e);

      return next(err);
    }
  },
);

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureLoggedIn, async function (req, res, next) {
  try {
    const { username } = req.params;
    return res.send(await User.messagesTo(username));
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureLoggedIn, async function (req, res, next) {
  try {
    const { username } = req.params;
    return res.send(await User.messagesFrom(username));
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

module.exports = router;
