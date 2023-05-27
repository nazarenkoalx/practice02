// localhost:60000/api/v1/drinks
// Cannot GET /api/v1/drinks

const express = require("express");
const drinksRouter = express.Router();
const drinksController = require("../controllers/DrinksController");

// add drink
drinksRouter.post(
  "/drinks",
  (req, res, next) => {
    console.log("joi worked");
    next();
  },
  drinksController.addDrink
);
// getAllDrinks
drinksRouter.get("/drinks", drinksController.getAllDrinks);

// getOneDrink
drinksRouter.get("/drinks/:id", drinksController.getOneDrink);

// updateDrink
drinksRouter.patch("/drinks/:id", drinksController.updateOneDrink);

// deleteDrink
drinksRouter.delete("/drinks/:id", drinksController.deleteDrink);

module.exports = drinksRouter;
