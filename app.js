const express = require("express");
const app = express();
const port = 3000;

app.listen(port);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/test", (req, res) => {
  const { id, password } = req.query;
  console.log(`${id} ${password}!`);
  res.send("Hello postman!");
});
