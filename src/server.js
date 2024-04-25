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

function handleConnection() {}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
