// створення серверів на різних порта

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const basicPort = 2000;
const pid = process.pid;


if (cluster.isMaster) {
    const count = os.cpus().length;
    console.log(`Master pid: ${pid}`);
    console.log(`Starting ${count} forks`);
    for (let i = 0; i < count; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log('Starting a new worker....');
        cluster.fork();
    });

    cluster.on('fork', (worker) => {
        console.log(`Worker #${worker.id} is ready`);
    });

    cluster.on('error', (error) => {
        console.log(error.name, ': ', error.message);
    });
} else {
    const id = cluster.worker.id;
    http.createServer((req, res) => {
        console.log(`Worker ${id}: WORKED`);
        res.writeHead(200);
        if (req.url === '/error') {           // добавив шлях для помилки, щоб вбити воркера і побачити що створився новий
            // uncaught exception
            throw new Error('ERRROOOOR!');
        } else {
            res.end(`Worker: ${id}, pid: ${pid}, port: ${basicPort + id}`);
        }
    }).listen(basicPort + id, (err) => {
        if (err) {
            return console.log(`Server error ${err}`);
        }
        console.log(`Listening port ${basicPort + id}`);
    });
}