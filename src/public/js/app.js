const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// app.js의 socket은 서버로의 연결을 뜻한다
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server 🍀");
});

// event.data를 보면 Blob이라는 instance를 return하고 있고 그 안에 prototype을 보면
// text라는 method가 있는데 이 method가 promise를 return하고 있습니다
// 따라서 비동기처리 (async/await)를 해주시면 됩니다
// socket.addEventListener("message", (message) => {
//   console.log("New message:", message);
// });
socket.addEventListener("message", async (event) => {
  console.log("New message:", await event.data.text());
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ✂️");
});

// 10초 뒤에 작동
// setTimeout(() => {
//   socket.send("hello from the Browser");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  //   console.log(input.value);
  // BE로 input.value를 보내주고 있음
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
