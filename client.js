function init() {
	// 43306
	socket = io.connect("http://multipacman.herokuapp.com");
	setEventHandlers();
};

var setEventHandlers = function() {
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("new player", onNewPlayer);
	socket.on("move player", onMovePlayer);
	socket.on("remove player", onRemovePlayer);
};

function onSocketConnected() {
	console.log("Connected to socket server");
	socket.emit("new player", {x: player.x, y: player.y});
};

function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
	//var newPlayer = new Player(data.x, data.y);
	//newPlayer.id = data.id;
	//remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {
	//movePlayer.setX(data.x);
	//movePlayer.setY(data.y);
};

function onRemovePlayer(data) {
	//players.splice(players.indexOf(removePlayer), 1);
};

init();

