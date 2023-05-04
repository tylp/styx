const {COMMAND_QUEUE} = require("./connector");

function sendCommand(channel, msg) {
    channel.sendToQueue(COMMAND_QUEUE, Buffer.from(msg));
}

module.exports = {
    sendCommand: sendCommand
}