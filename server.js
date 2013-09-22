var host = process.env.HOST, port = process.env.PORT || 8080;
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
	fs = require('fs');

var players = [];

//var rocket = io.listen(app);
console.log("PLEASE BE HERE");
app.listen(port);
console.log("now we're here");
io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});


function handler(req, res) {
	setEventHandlers();
	//console.log("now we're there");
	var url = require('url').parse(req.url, true);
	var target = (url.pathname == "/") ? "index.html" : url.pathname.slice(1);
	res.writeHead(200);
	res.end(fs.readFileSync(target));
}

var setEventHandlers = function() {
	//console.log("in event hand");
	io.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
	console.log(client.id);
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
	var removePlayer = playerById(this.id);
	if (!removePlayer) {
		return;
	};
	players.splice(players.indexOf(removePlayer), 1);
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	console.log("new p serv");
	var newPlayer = new Player(data.x, data.y);
	newPlayer.setID(this.id);
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.x, y: newPlayer.y});
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.x, y: existingPlayer.y});
	};
	players.push(newPlayer);
};

function onMovePlayer(data) {
	var movePlayer = playerById(this.id);
	if (!movePlayer) {
		return;
	};
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.x, y: movePlayer.y});
};

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

setEventHandlers();

