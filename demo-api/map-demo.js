const express = require("express");
const app = express();

app.listen(3000);

const db = new Map();
db.set({ id: 1, productName: "Notebook", price: 2000 });
db.set({ id: 2, productName: "Cup", price: 5000 });
db.set({ id: 3, productName: "Chair", price: 150000 });

app.get("/:id", (req, res) => {
  const { id } = params;
  const parsedId = parseInt(id);
  console.log(id);

  const data = db.get(parsedId);
  if (data === undefined) {
    res.json({
      message: "없는 상품입니다.",
    });
  } else {
    res.json(data);
  }

  res.json(db.get(parsedId));
});
