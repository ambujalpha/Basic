const EventEmitter = require('events');
const emitter = new EventEmitter();

var url='http://mylogger.io/log';
/*
function log(message) {
    //send an http request
    console.log(message);
    emitter.emit('messageLogged',{id:1, url:'http://'})
}*/
/*
module.exports.log = log;
module.exports.endPoint  = url;*/

class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged',{id:1, url:'http://'})
    }
}

module.exports=Logger;