import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 이렇게 하면 http 서버와 wss 서버를 둘 다 돌릴 수 있음
// 동일한 포트에서 두 개 다 처리 가능
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

// socket으로 FE와 real-time으로 소통할 수 있다
// server.js의 socket은 연결된 브라우저를 뜻한다
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser 🍀");
  socket.on("close", () => {
    console.log("Disconnected from the Browser ✂️");
  });
  socket.on("message", (message) => {
    message = message.toString("utf-8");
    sockets.forEach((aSocket) => aSocket.send(message));
  });
});

server.listen(3000, handleListen);
