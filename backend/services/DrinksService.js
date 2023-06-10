const drinkModel = require("../models/drinkModel");

class DrinksService {
  async showAll(id) {
    const drinks = await drinkModel.find({ owner: id });
    if (!drinks) {
      return null;
    }
    return drinks;
  }

  async add(data) {
    const addedDrink = await drinkModel.create({ ...data });
    if (!addedDrink) {
      return null;
    }
    return addedDrink;
  }

  async getOne(id) {
    const drink = await drinkModel.findOne({ id });
    if (!drink) {
      return null;
    }
    return drink;
  }
}

module.exports = new DrinksService();
