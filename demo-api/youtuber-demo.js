const { YouTuber } = require("../types/api-types");
const express = require("express");
const app = express();
const port = 3000;

let id = 1;
const youTubers = new Map();

youTubers.set(id++, new YouTuber("게임-유튜버", 1256624, 135));

youTubers.set(id++, new YouTuber("개발-유튜버", 426624, 53));

youTubers.set(id++, new YouTuber("운동-유튜버", 212058, 81));

app.use(express.json());

app.listen(port);

let allYoutubers = [];

app.get("/youtubers", (req, res) => {
  youTubers.forEach((youTuber) => {
    allYoutubers.push(youTuber);
  });

  res.json(allYoutubers);
});

app.get("/youtubers/:id", (req, res) => {
  const { id } = req.params;
  let youTuber = youTubers.get(parseInt(id));

  if (youTuber == undefined) {
    res.json({
      message: "등록되지 않은 유튜버입니다.",
    });
  } else {
    res.json(youTuber);
  }
});

app.post("/youtubers", (req, res) => {
  const { channelTitle, subscriber, videoCount } = req.body;

  youTubers.set(id++, new YouTuber(channelTitle, subscriber, videoCount));

  res.json(`Welcome ${channelTitle}!`);
});
