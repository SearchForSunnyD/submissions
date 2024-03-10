const express = require("express");

const Message = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const ExpressError = require("../expressError");
const router = new express.Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const { id } = req.params;
    const m = await Message.get(id)
    if (m.to_username === req.user || m.from_username === req.user) {
    return res.send(await Message.get(id));
    }
    return next({ status: 400, message: "Unauthorized" });
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const { from_username, to_username, body } = req.body;
    return res.send(await Message.create({ from_username, to_username, body }));
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const { id } = req.params;
    const m = await Message.get(id);
    if (req.user === m.to_username) {
      return res.send(await Message.markRead(id));
    }
    return next({ status: 400, message: "Unauthorized" });
  } catch (e) {
    const err = new ExpressError(e);

    return next(err);
  }
});

module.exports = router;
