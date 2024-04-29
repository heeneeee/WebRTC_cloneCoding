const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

// app.js의 socket은 서버로의 연결을 뜻한다
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  // object를 string으로
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server 🍀");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerHTML = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ✂️");
});
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  //   console.log(input.value);
  // BE로 input.value를 보내주고 있음
  // type => new_message, payload => input.value
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerHTML = `You: ${input.value}`;
  messageList.append(li);
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
