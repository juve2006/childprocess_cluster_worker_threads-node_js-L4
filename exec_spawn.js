const { exec, spawn , fork } = require('child_process');
const fs = require('fs');


function execProcess(cmd) {
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout:\n${stdout}`);
    });
}

function spawnProcess(cmd, arguments) {
    const child = spawn(cmd, arguments);

    child.stdout.on('data', (data) => {
        let allData = ''
        allData+=data;
        fs.writeFileSync("page.txt", allData);
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('error', (error) => {
        console.error(`error: ${error.message}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

// execProcess('npm -v');
// spawnProcess('node', ['-v']);
//
// execProcess('ls -l /tmp');  // list files and folders of temp fold
// spawnProcess('ls', ['-l', '/tmp']);
//
// execProcess('curl https://inventorsoft.co');
// spawnProcess('curl', ['https://inventorsoft.co/']);
//




