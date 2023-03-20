// Get the send button from the DOM
const sendButton = document.getElementById("send-button");

// listeners in javascript wait for a user action before running commands
// in this example, once the user clicks the button an async function (something that runs while the user can do other things. Ie - it doesn't interfere with their UX)
sendButton.addEventListener("click", async () => {
  // Get the user input from the value they type into the textbox
  const userInput = document.getElementById("user-input").value;
  // await means the function pauses until it gets a promise. In this code the promise is the value from "user-input"
  // fetch message using the /message endpoint (which sends HTTP requests from clients) on the server with input data in request body
  const response = await fetch("/message", {
    // fetch method gets resources from the server. The CRUD method in software is the first param, hence the "POST" request.
    method: "POST",
    // body method stringifies the userInput (string retrieved from html element) - why does it use JSON?
    body: JSON.stringify({ message: userInput }),
    headers: { "Content-Type": "application/json" },
  });
  // for this to run, the first fetch method needs to complete and that data is assigned to a variable
  // named data where it's stored as a json
  const data = await response.json();
  // Append message to the conversation in the DOM
  appendMessage("from-bot", data.message);
});

/* 
Note on async/await:
This is a way to write async code that looks synchronous. Code can pause at points as it waits for something to happen. 
A response from a server is an example but it doesn't block the execution of the code. 
Await pauses the execution of an async function until a Promise is fulfilled or rejected. In this code it's waiting for a "fetch" request before continuing.
*/ 
