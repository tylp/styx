const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const {sendCommand} = require('./mq/write');
const {connectAndCreateChannel, close} = require('./mq/connector');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();


// socket.io server
io.on("connection", async (socket) => {
	console.info("Client connected through websocket");

	const channel = await connectAndCreateChannel();

	socket.on('bot-commands', data => {
		console.log(data);
		sendCommand(channel, data);
	});

	socket.on("ws-health-check-request", () => {
		socket.emit("ws-health-check-reply");
	});

	socket.on("disconnect", data => {
		console.info("client disconnected from websocket");
		close(channel);
	});

});

nextApp.prepare().then(() => {
	app.get("*", (req, res) => {
		return nextHandler(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});