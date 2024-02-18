const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static allItems() {
    return items;
  }

  static update(name, data) {
    let item = Item.find(name);

    if (!item) {
      throw { message: "Item not found", status: 404 };
    }

    item.name = data.name;
    item.price = data.price;

    return item;
  }

  static find(name) {
    const item = items.find((i) => i.name === name);

    if (!item) {
      throw { message: "Item not found", status: 404 };
    }

    return item;
  }

  static remove(name) {
    let item = Item.find(name);

    if (!item) {
      throw { message: "Item not found", status: 404 };
    }

    items.splice(
      items.findIndex((i) => i.name === name),
      1,
    );
  }
}

module.exports = Item;
