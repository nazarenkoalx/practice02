// localhost:60000/api/v1/drinks
// Cannot GET /api/v1/drinks

const express = require("express");
const drinksRouter = express.Router();
const drinksController = require("../controllers/DrinksController");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const authMiddelware = require("../middlewares/authMiddelware");

// add drink
drinksRouter.post(
  "/drinks",
  authMiddelware,
  (req, res, next) => {
    next();
  },
  drinksController.addDrink
);
// getAllDrinks
drinksRouter.get(
  "/drinks",
  authMiddelware,
  rolesMiddleware(["USER", "ADMIN", "MODERATOR"]),
  drinksController.getAllDrinks
);

// ["USER", "ADMIN", "CEO", "MODERATOR"]

// getOneDrink
drinksRouter.get("/drinks/:id", drinksController.getOneDrink);

// updateDrink
drinksRouter.patch("/drinks/:id", drinksController.updateOneDrink);

// deleteDrink
drinksRouter.delete("/drinks/:id", drinksController.deleteDrink);

module.exports = drinksRouter;
