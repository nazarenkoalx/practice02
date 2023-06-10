const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports = (req, res, next) => {
  try {
    //1. получаем токен
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      res.status(401);
      throw new Error("Not authorisation token");
    }
    if (token) {
      //2. розшфровуєм і верифікуєм токен
      const decoded = jwt.verify(token, "pizza");
      //3. передаєм дані про користувача далі
      req.user = decoded.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, status: error.message });
  }
};
