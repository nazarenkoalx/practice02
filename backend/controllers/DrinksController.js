const drinkModel = require("../models/drinkModel");
const asyncHandler = require("express-async-handler");
const DrinksService = require("../services/DrinksService");

class DrinksController {
  addDrink = asyncHandler(async (req, res) => {
    const { title, adult } = req.body;
    const id = req.user;
    if (!title || !adult) {
      res.status(400);
      throw new Error("provide all required fields");
    }
    const drink = await DrinksService.add({ ...req.body, owner: id });
    if (!drink) {
      return res.status(400).json({
        code: 400,
        message: "Unable to add drink",
      });
    }

    return res.status(201).json({ code: 201, message: "Success", data: drink });
  });

  getAllDrinks = asyncHandler(async (req, res) => {
    const id = req.user;
    const allDrinks = await DrinksService.showAll(id);
    if (!allDrinks) {
      return res.status(400).json({
        code: 400,
        message: "Unable to fetch drinks",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Success",
      data: allDrinks,
      qty: allDrinks.length,
    });
  });

  getOneDrink = asyncHandler(async (req, res) => {
    const { id } = req.body;
    res.send("getOneDrink");
  });

  updateOneDrink = asyncHandler(async (req, res) => {
    res.send("updateOneDrink");
  });
  deleteDrink = asyncHandler(async (req, res) => {
    res.send("deleteDrink");
  });
}

module.exports = new DrinksController();
