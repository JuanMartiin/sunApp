const runner = require('child_process');
runner.exec(`python3 ./node/script.py`, async function (err, response) {
    if(err) console.log(err);
    else console.log(response);
});