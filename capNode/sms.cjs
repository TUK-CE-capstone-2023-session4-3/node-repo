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
  res.send({ message: "runningnode" });
  messageService
    .sendOne({
      to: process.env.PHONE_TO,
      from: process.env.PHONE_FROM,
      text: "담배피고올께",
    })
    .then((res) => console.log("sucess"));
});

server.listen(8080, () => {
  console.log("server is running on 8080");
});
