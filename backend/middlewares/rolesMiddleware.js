const jwt = require("jsonwebtoken");

module.exports = (rolesArray) => {
  return (req, res, next) => {
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
        const userRoles = decoded.roles;
        let hasRole = false;
        userRoles.forEach((role) => {
          if (rolesArray.includes(role)) {
            hasRole = true;
          }
        });
        if (!hasRole) {
          res.status(403);
          throw new Error("Forbidden");
        }
        //3. передаєм дані про користувача далі
        //  req.user = decoded.id;
        next();
      }
    } catch (error) {
      res.status(403).json({ code: 403, status: error.message });
    }
  };
};
