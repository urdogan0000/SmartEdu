const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");

const app = express();

//template engine
app.set("view engine", "ejs");

//Connect DB
mongoose
  .connect(
    "mongodb+srv://admin:asd123@cluster0.9vwzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
     
     
    }
  )
  .then(() => {
    console.log("Db Connected Succesfully");
  });

//Middlewares
app.use(express.static("public"));

//Routes

app.use("/", pageRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
