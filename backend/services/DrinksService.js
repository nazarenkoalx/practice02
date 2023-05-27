const drinkModel = require("../models/drinkModel");

class DrinksService {
  async showAll() {
    const drinks = await drinkModel.find();
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
