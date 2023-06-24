const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const path = require("path");
const cofigPath = path.join(__dirname, "..", "config", ".env");
require("colors");
const errorHandler = require("./middlewares/errorHandler");
const notFoundError = require("./middlewares/notFoundError");
const asyncHandler = require("express-async-handler");
const UserModel = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddelware");
const RolesModel = require("./models/rolesModel");
const { engine } = require("express-handlebars");
const sendEmail = require("./services/sendEmail");

dotenv.config({ path: cofigPath });

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", async (req, res) => {
  // res.send(req.body);

  try {
    res.render("send", {
      msg: "Contacts send success",
      name: req.body.userName,
      email: req.body.userEmail,
    });
    await sendEmail(req.body);
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message });
  }
});

app.use("/api/v1", require("./router/drinkRoutes"));

//registration save user in DB
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // 1. отримуємо та валідуємо дані отримані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("provide all required fields");
    }
    // 2. шукаємо користувача в базі даних
    const candidate = await UserModel.findOne({ email });
    // 3. якшо знайшли - кидаєм помилку - юзер вже існує
    if (candidate) {
      res.status(400);
      throw new Error("user already exists");
    }
    // 4. якшо не знайшли - хешуєм пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. зберігаємо юзера в базі з хешованим паролем
    const roles = await RolesModel.findOne({ value: "USER" });
    const userWithPassord = await UserModel.create({
      ...req.body,
      password: hashedPassword,
      roles: [roles.value],
    });
    return res.status(201).json({
      code: 201,
      message: "Success",
      data: { email: userWithPassord.email, name: userWithPassord.name },
    });
  })
);

//authentefication check up given credentionals from user within data in DB
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // 1. отримуємо та валідуємо дані отримані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("provide all required fields");
    }
    // 2. шукаємо користувача в базі даних
    const user = await UserModel.findOne({ email });
    // 3. якшо знайшли - розшифровуємо пароль

    const isValidPassword = await bcrypt.compare(password, user.password);

    // 4. якшо не знайшли або не розшифрували пароль кидаєм помилку - невірний логін/пароль
    if (!isValidPassword || !user) {
      res.status(401);
      throw new Error("invalid password or login");
    }

    //   // 5. видаєм токен і зберігаємо в базі
    const token = generateToken({
      friends: ["Alex", "Ira", "Artem"],
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    await user.save();
    return res.status(200).json({
      code: 200,
      message: "Success",
      data: {
        email: user.email,
        token: user.token,
      },
    });
  })
);
// authorisation chek user users role in app

// logout loss of all users
app.get(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = req.user;
    const user = await UserModel.findByIdAndUpdate(id, { token: null });
    return res.status(200).json({
      code: 200,
      message: "Logout success",
      data: {
        email: user.email,
      },
    });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "pizza", { expiresIn: "8h" });
}

app.use("*", notFoundError);

app.use(errorHandler);

connectDB();
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.green.bold.italic);
});
