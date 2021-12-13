import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts";
(async() => {
    for await (let msg of readLines(Deno.stdin)) onInput( ...msg.split(/ (.+)/s) );
})()

// Send command to server
function sendCommand(commandName, data) {
  if (!data) console.log("!" + commandName);
  else console.log("!" + commandName + " " + JSON.stringify(data));
}

// Send message
function sendTo(recipient, data) {
  console.log("!send " + recipient + " " + data);
}

// Recieve from client.html
let lastPlayerListRequester = null
function onInput(sender, message) {
    if (sender === "server") {
        let data = JSON.parse(message);
        if (data.command === "room") {
            sendTo(lastPlayerListRequester, message);
        }
    } else {
        if (message.includes("-players")) {
            lastPlayerListRequester = sender;
            sendCommand("room");
            return;
        }
        sendTo("everyone", message.replace(/"/g, ''));
    }
}
console.log("running");
