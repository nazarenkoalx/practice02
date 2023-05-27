const drinkModel = require("../models/drinkModel");
const asyncHandler = require("express-async-handler");
const DrinksService = require("../services/DrinksService");

class DrinksController {
  //   async addDrink(req, res) {
  //     try {
  //       const { title, adult } = req.body;
  //       if (!title || !adult) {
  //         res
  //           .status(400)
  //           .json({ code: 400, message: "provide all required fields" });
  //       }
  //       await drinkModel.create({ ...req.body });
  //     } catch (error) {
  //       res.send(error.message);
  //     }
  //     res.send(req.body);
  //   }

  // addDrink = asyncHandler(async (req, res) => {
  //   const { title, adult } = req.body;
  //   if (!title || !adult) {
  //     res.status(400);
  //     throw new Error("provide all required fields");
  //   }
  //   const drink = await drinkModel.create({ ...req.body });

  //   res.status(201).json({ code: 201, message: "Success", data: drink });
  // });

  addDrink = asyncHandler(async (req, res) => {
    const { title, adult } = req.body;
    if (!title || !adult) {
      res.status(400);
      throw new Error("provide all required fields");
    }
    const drink = await DrinksService.add(req.body);
    if (!drink) {
      return res.status(400).json({
        code: 400,
        message: "Unable to add drink",
      });
    }

    return res.status(201).json({ code: 201, message: "Success", data: drink });
  });

  // getAllDrinks = asyncHandler(async (req, res) => {
  //   const allDrinks = await drinkModel.find({});
  //   res.status(200).json({
  //     code: 200,
  //     message: "Success",
  //     data: allDrinks,
  //     qty: allDrinks.length,
  //   });
  // });
  getAllDrinks = asyncHandler(async (req, res) => {
    const allDrinks = await DrinksService.showAll();
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
