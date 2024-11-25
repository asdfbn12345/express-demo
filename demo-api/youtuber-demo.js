const { YouTuber } = require("../types/api-types");
const express = require("express");
const app = express();
const port = 3000;

let id = 1;
const youtubers = new Map();

youtubers.set(id++, new Youtuber("게임-유튜버", 1256624, 135));

youtubers.set(id++, new Youtuber("개발-유튜버", 426624, 53));

youtubers.set(id++, new Youtuber("운동-유튜버", 212058, 81));

app.use(express.json());

app.listen(port);

app.get("/youtubers", (req, res) => {
  let allYoutubers = [];

  if (youtubers.size === 0) {
    res.status(404).send({
      message: "조회할 유튜버가 없습니다.",
    });
  }

  youtubers.forEach((youtuber) => {
    allYoutubers.push(youtuber);
  });

  res.json(allYoutubers);
});

app.get("/youtubers/:id", (req, res) => {
  const { id } = req.params;
  let youtuber = youtubers.get(parseInt(id));

  if (youtuber == undefined) {
    res.status(404).json({
      message: "등록되지 않은 유튜버입니다.",
    });
  } else {
    res.json(youtuber);
  }
});

app.post("/youtubers", (req, res) => {
  const { channelTitle, subscribers, videoCount } = req.body;

  if (!(channelTitle && subscribers && videoCount)) {
    res.status(400).send({
      message: "올바르지 않은 정보로 등록에 실패했습니다.",
    });
    return;
  }

  youtubers.set(id++, new Youtuber(channelTitle, subscribers, videoCount));

  res.status(201).json(`Welcome ${channelTitle}!`);
});

app.delete("/youtubers", (req, res) => {
  if (youtubers.size == 0) {
    res.status(404).send({
      message: "삭제할 유튜버가 없습니다.",
    });
    return;
  }

  res.json({
    message: "너무 위험한 요청입니다.",
  });
});

app.delete("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let youtuber = youtubers.get(id);
  if (!youtuber) {
    res.status(404).json({
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

app.put("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { channelTitle, subscribers, videoCount } = req.body;

  const youtuber = youtubers.get(id);
  if (!youtuber) {
    res.status(404).json({
      message: "그런 채널 없소",
    });
  }

  youtuber.channelTitle =
    channelTitle === undefined ? youtuber.channelTitle : channelTitle;
  youtuber.subscribers =
    subscribers === undefined ? youtuber.subscribers : subscribers;
  youtuber.videoCount =
    videoCount === undefined ? youtuber.videoCount : videoCount;
  youtubers.set(id, youtuber);

  res.json(youtubers.get(id));
});
