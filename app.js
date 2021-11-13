const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Anasayfa");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
