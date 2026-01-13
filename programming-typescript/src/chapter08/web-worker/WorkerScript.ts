import EventEmitter from "events";
import { Commands, Events, SafeEmitter } from "./type";

let commandEmitter: SafeEmitter<Commands> = new EventEmitter();

let eventEmitter: SafeEmitter<Events> = new EventEmitter();

onmessage = (command) => {
  commandEmitter.emit(command.data.type, ...command.data.data);
};

eventEmitter.on("receivedMessage", (threadID, userID, message) => {
  postMessage({ type: "receivedMessage", data: [threadID, userID, message] });
});

eventEmitter.on("createdThread", (threadID, participants) => {
  postMessage({ type: "createdThread", data: [threadID, participants] });
});

commandEmitter.on("sendMessageToThread", (threadID, message) => {
  console.log(`Send message to thread ${threadID}: ${message}`);
});

eventEmitter.emit("createdThread", 1, [101, 102]);
