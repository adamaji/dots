var host = process.env.HOST, port = process.env.PORT || 8080;
var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app);//,
	//fs = require('fs');

app.listen(port);

io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});

function handler(req, res) {
	res.writeHead(200);
	//res.end(fs.readFileSync("index.html"));
	res.end("hello sockets");
}

socket.emit('log', {
	data: ""
});

var setEventHandlers = function() {
	socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
	//util.log("New player has connected: "+client.id);
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
	//util.log("Player has disconnected: "+this.id);
	/*
	var removePlayer = playerById(this.id);
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
	players.splice(players.indexOf(removePlayer), 1);
	*/
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	this.broadcast.emit("new player", {});
	/*
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
	players.push(newPlayer);
	*/
};

function onMovePlayer(data) {
	/*
	var movePlayer = playerById(this.id);
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
	*/
	this.broadcast.emit("move player", {});
};

setEventHandlers();

