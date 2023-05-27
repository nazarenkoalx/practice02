const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const path = require("path");
const cofigPath = path.join(__dirname, "..", "config", ".env");
require("colors");
const errorHandler = require("./middlewares/errorHandler");
const notFoundError = require("./middlewares/notFoundError");

dotenv.config({ path: cofigPath });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./router/drinkRoutes"));

app.use("*", notFoundError);

app.use(errorHandler);

connectDB();
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.green.bold.italic);
});
