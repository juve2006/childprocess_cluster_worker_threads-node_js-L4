const {parentPort} = require("worker_threads");

parentPort.on("message", (message) => {
    console.log(message);
    setTimeout(() => {
        parentPort.postMessage("Work finish!")
    }, 5000);
});