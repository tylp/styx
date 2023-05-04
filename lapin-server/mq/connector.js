const amqp = require('amqplib/callback_api');

const COMMAND_QUEUE = "command-queue";
const DATA_QUEUE = "data-queue";

async function connectAndCreateChannel(url = 'amqp://0.0.0.0') {
    return new Promise((resolve, reject) => {
        amqp.connect(url, (connectError, connection) => {

            if (connectError) {
                console.error(connectError);
                reject(connectError);
            }
    
            console.info(`AMQP connected to ${url}`);
            connection.createChannel((chanError, channel) => {

                if (chanError) {
                    console.error(chanError);
                    reject(chanError);
                }
    
                channel.assertQueue(COMMAND_QUEUE, {durable: false});
                channel.assertQueue(DATA_QUEUE, {durable: false});
    
                console.info(`Channels created.`)
    
                resolve(channel);
            });
        });
    });
    
}

function close(channel) {
    console.info("Closing amqp channel.")
    channel.close();
}

module.exports = {
    COMMAND_QUEUE: COMMAND_QUEUE,
    DATA_QUEUE, DATA_QUEUE,
    connectAndCreateChannel: connectAndCreateChannel,
    close: close
}