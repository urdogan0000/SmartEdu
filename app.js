const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require('dotenv').config()

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");


const app = express();

//template engine
app.set("view engine", "ejs");

//Connect DB
var uri = process.env.DB_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db Connected Succesfully");
  })
  .catch(() => {
    console.log("Veritabnına bağlanırken hata");
  });
//global Variable

global.userIN = null;

//Middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat", // Buradaki texti değiştireceğiz.
    store: MongoStore.create({
      mongoUrl:uri,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
    resave: false,
    saveUninitialized: true,
  })
);


//Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
