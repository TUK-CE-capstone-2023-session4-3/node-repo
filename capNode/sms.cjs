// const { config, Group } = require("coolsms-sdk-v4");
// const conf = require("../src/smsconfig"); // smsconfig.json

// //////////////////////////////////////////////////////////////////////
// // Cool SMS API 설정
// //////////////////////////////////////////////////////////////////////
// config.init({
//   apiKey: conf.apiKey,
//   apiSecret: conf.apiSecret,
// });

// async function send(message: any, agent = {}) {
//   try {
//     var res = await Group.sendSimpleMessage(message, agent);
//     return res;
//   } catch (e) {
//     console.log(e);
//   }
// }

// //////////////////////////////////////////////////////////////////////
// // Cool SMS API 사용
// //////////////////////////////////////////////////////////////////////
// exports.sendSms = (req: any, res: any) => {
//   const number = req.body.number; // SMS 전송할 번호
//   const message = req.body.message; // SMS 전송할 메시지

//   console.log(" > number: " + number);
//   console.log(" > message: " + message);

//   try {
//     var res: any = send({
//       to: number,
//       text: message,
//       type: conf.type,
//       from: conf.from,
//     });
//     console.log(res);
//     res.json({ result: true });
//   } catch (e) {
//     console.log(e);
//     res.json({ result: false, message: "sms transmission failed" });
//   }
// };

require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms(
  process.env.API_KEY,
  process.env.API_SECRET_KEY
);
// import express from "express";
// import path from "path";
// import cors from "cors";
const app = express();

const server = require("http").createServer(app);

app.use(cors()); // cors 미들웨어를 삽입합니다.

app.get("/", (req, res) => {
  //요청패스에 대한 콜백함수를 넣어줍니다.
  // res.send({ message: "running node" });
  // switch (req.query.Id) {
  //   case 1:
  //     console.log("1");
  //     messageService
  //       .sendOne({
  //         to: process.env.PHONE_TO,
  //         from: process.env.PHONE_FROM,
  //         text: "소방차가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
  //       })
  //       .then((res) => console.log(res));
  //     break;
  //   case 2:
  //     console.log("2");
  //     messageService
  //       .sendOne({
  //         to: process.env.PHONE_TO,
  //         from: process.env.PHONE_FROM,
  //         text: "응급가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
  //       })
  //       .then((res) => console.log(res));
  //     break;
  //   case 3:
  //     console.log("3");
  //     messageService
  //       .sendOne({
  //         to: process.env.PHONE_TO,
  //         from: process.env.PHONE_FROM,
  //         text: "경찰가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
  //       })
  //       .then((res) => console.log(res));
  //     break;
  // }
  if (req.query.Id == "1") {
    messageService
      .sendOne({
        to: process.env.PHONE_TO,
        from: process.env.PHONE_FROM,
        text: "응급차가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
      })
      .then((res) => console.log(res));
  } else if (req.query.Id == "2") {
    messageService
      .sendOne({
        to: process.env.PHONE_TO,
        from: process.env.PHONE_FROM,
        text: "경찰이 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
      })
      .then((res) => console.log(res));
  } else if (req.query.Id == "3") {
    messageService
      .sendOne({
        to: process.env.PHONE_TO,
        from: process.env.PHONE_FROM,
        text: "관리자가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
      })
      .then((res) => console.log(res));
  }
  // messageService
  //   .sendOne({
  //     to: process.env.PHONE_TO,
  //     from: process.env.PHONE_FROM,
  //     text: "경찰가 필요해요 응급상황입니다 여기에 사람이 쓰러져있어요!",
  //   })
  //   .then((res) => console.log(res));
});
//여러 메시지 발송 예제, 한 번 호출 당 최대 10,000건 까지 발송 가

app.get("/messages", (req, res) => {
  messageService.getMessages({ limit: 10 }).then((response) => {
    res.json({ messages: response });
  });
});

app.get("/balance", (req, res) => {
  messageService.getBalance().then((response) => {
    res.json({ balance: response.balance });
  });
});
server.listen(8080, () => {
  console.log("server is running on 8080");
});
