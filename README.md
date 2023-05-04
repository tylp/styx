# styx

## Rabbitmq broker

Run the rabbitmq docker-container :

`docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=<default_user> -e RABBITMQ_DEFAULT_PASS=<default_admin> rabbitmq:3.11-management`

## Connect to the broker.

Before trying to connect from host to host, make sure to have created specific rules to the broker firewall.

Rust :

```rust
let uri = "amqp://<user>:<pass>@192.168.1.83:5672";
```

Nodejs :

```javascript
let amqp = require("amqplib/callback_api");

amqp.connect('amqp://<user>:<pass>@0.0.0.0', function (error0, connection) {});
```

