// app.js의 socket은 서버로의 연결을 뜻한다
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server 🍀");
});

socket.addEventListener("message", (message) => {
  console.log("New message:", message, " from the Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ✂️");
});

// 10초 뒤에 작동
setTimeout(() => {
  socket.send("hello from the Browser");
}, 10000);
