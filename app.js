/*
const logger = require('./logger');

console.log('message');
console.log(logger);
console.log(__filename)
console.log(__dirname)*/
/*
require('path')

const os=require('os')

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory' + totalMemory);
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
*/
/*
const fs=require('fs');
const files=fs.readdirSync('./');
console.log(files)*/
/*
const EventEmitter = require('events');


const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log('Listener called',arg);
});

logger.log('message');*/

const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url==='/'){
        res.write('Hello World');
        res.end();
    }
});

server.on('connection',(socket)=>{
    console.log('New Connection...');
});

server.listen(3000);

console.log('Listening on port 3000...');