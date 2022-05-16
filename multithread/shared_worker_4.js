/**
 * Коли ціль використання декількох потоків є швидкісна обробка даних, потрібна спільна память, з якою декілька
 * процесів зможуть працювати одночасно.
 *
 * Використовуючи SharedArrayBuffer, фонові задачі можуть читати та писати в одну і ту ж область памяті.
 * Це означає, що не буде додаткових затрат системних сесурсів, на обмін данними між потоками, і затримок при використанні postMessage.
 * */
const { Worker } = require("worker_threads");

let nums = [21, 33, 15, 40];

const size = Int32Array.BYTES_PER_ELEMENT * nums.length;
console.log(`buffer size: ${size} \n`)

const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);

console.log(`Shared array size, before data: ${sharedArray} \n`);

nums.forEach((num, index) => {
    Atomics.store(sharedArray, index, num);
})

console.log(`Shared array: ${sharedArray} \n`);

const worker = new Worker("./workers_process.js");

worker.on("message", result => {
    console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.postMessage({ nums: sharedArray });
