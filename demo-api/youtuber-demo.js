const { YouTuber } = require("../types/api-types");
const express = require("express");
const app = express();
const port = 3000;

let id = 1;
const youtubers = new Map();

youtubers.set(id++, new YouTuber("게임-유튜버", 1256624, 135));

youtubers.set(id++, new YouTuber("개발-유튜버", 426624, 53));

youtubers.set(id++, new YouTuber("운동-유튜버", 212058, 81));

app.use(express.json());

app.listen(port);

let allYoutubers = [];

app.get("/youtubers", (req, res) => {
  youtubers.forEach((youtuber) => {
    allYoutubers.push(youtuber);
  });

  res.json(allYoutubers);
});

app.get("/youtubers/:id", (req, res) => {
  const { id } = req.params;
  let youtuber = youtubers.get(parseInt(id));

  if (youtuber == undefined) {
    res.json({
      message: "등록되지 않은 유튜버입니다.",
    });
  } else {
    res.json(youtuber);
  }
});

app.post("/youtubers", (req, res) => {
  const { channelTitle, subscriber, videoCount } = req.body;

  youtubers.set(id++, new YouTuber(channelTitle, subscriber, videoCount));

  res.json(`Welcome ${channelTitle}!`);
});

app.delete("/youtubers", (req, res) => {
  res.json({
    message: "너무 위험한 요청입니다.",
  });
});

app.delete("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let youtuber = youtubers.get(id);
  if (!youtuber) {
    res.json({
      message: "유튜버 ID가 등록되어있지 않습니다.",
    });
    return;
  }

  channelTitle = youtuber.channelTitle;
  youtubers.delete(id);
  res.json({
    message: `${channelTitle}님 이용해주셔서 감사합니다.`,
  });
});
