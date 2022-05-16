/**
 * Різниця Fork та Worker полягає в тому, що воркери запускаються на тому ж процесі, але з своїм контекстом, тобто
 * використовують менше памяті та можуть ділитись нею.
 * */
const { Worker } = require("worker_threads");

const worker = new Worker("./worker_process");

worker.on("message", result => {
    console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log("Finished with code", exitCode);
})
console.log("Executed in the parent thread");

worker.postMessage({num: 40});
worker.postMessage({num: 12});
