const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute=require('./routes/courseRoute')

const app = express();

//template engine
app.set("view engine", "ejs");

//Connect DB
var uri =
  "mongodb://user:asd123@cluster0-shard-00-00.yuseg.mongodb.net:27017,cluster0-shard-00-01.yuseg.mongodb.net:27017,cluster0-shard-00-02.yuseg.mongodb.net:27017/SmartEdudB?ssl=true&replicaSet=atlas-9lchyf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db Connected Succesfully");
  }).catch(()=>{
    console.log('Veritabnına bağlanırken hata')
  });

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes

app.use("/", pageRoute);
app.use("/courses", courseRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
