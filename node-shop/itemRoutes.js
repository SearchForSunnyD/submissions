const Item = require("./item");

const express = require("express");
const router = new express.Router();

router.post("/", function (req, res) {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

router.get("/", (req, res) => {
  try {
    res.json({ items: Item.allItems() });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", isValid, (req, res) => {
  res.json({ item: Item.find(req.params.name) });
});

router.patch("/:name", isValid, (req, res) => {
  let item = Item.update(req.params.name, req.body);
  res.json({ item: item });
});

router.delete("/:name", isValid, (req, res) => {
  Item.remove(req.params.name);
  res.json({ message: "Item removed" });
});

function isValid(req, res, next) {
  try {
    Item.find(req.params.name);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = router;
