const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
// returns the first element from the DOM that matches the selector (.conversation)
const conversation = document.querySelector(".conversation");

sendButton.addEventListener("click", () => {
  const userInput = inputField.value;
  // this value gets updated. it's an empty string now but when a user writes information it will update
  // is this why the appendMessage code exists here?
  inputField.value = "";
  appendMessage("from-user", userInput);

  fetch("/message", {
    method: "POST",
    body: JSON.stringify({ message: userInput }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  // .then() handles js promises when rejected/resolved
  // they handle them from the Flask endpoint after a POST request is made
    .then((response) => response.json())
    .then((data) => {
      const message = data.message;
      appendMessage("from-bot", message);
    });
});

function appendMessage(from, text) {
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", from);
  const messageText = document.createElement("div");
  messageText.classList.add("message-text");
  messageText.innerText = text;
  messageElem.appendChild(messageText);
  conversation.appendChild(messageElem);
  conversation.scrollTop = conversation.scrollHeight;
}
