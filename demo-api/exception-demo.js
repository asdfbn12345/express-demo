const express = require("express");
const app = express();

app.listen(3000);

const fruits = new Map([
  { id: 1, name: "apple" },
  { id: 2, name: "orange" },
  { id: 3, name: "strawberry" },
  { id: 4, name: "blueberry" },
]);

app.get("/fruits", (req, res) => {
  res.json(fruits);
});

app.get("/fruits/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fruit = fruits.get(id);
  if (fruit === undefined) {
    res.status(404).send({
      message: "Fruit ID를 찾을 수 없습니다.",
    });
    return;
  }

  res.json(fruit);
});
