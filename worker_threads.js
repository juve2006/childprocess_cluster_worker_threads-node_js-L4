//створення сервера з worker_threads
const express = require("express");
const { Worker } = require("worker_threads");

const server = express();
const worker = new Worker("./worker_process.js");
const port = 2000;

worker.on("message", (message) => {
    console.log(message);
});

server.get("/", (req, res) => {
    return res.send("Home page");
});
server.get("/worker", (req, res) => {
    worker.postMessage("invoke work");
    return res.send("Page with worker running!");
});

server.listen(port, ()=>{
    console.log ('server start on port', port)
});
