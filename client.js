var socket;

function init() {
	// 43306
	console.log("client init");
	socket = io.connect("http://multipacman.herokuapp.com");
	setEventHandlers();
};

var setEventHandlers = function() {
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	//socket.on("new player", onNewPlayer);
	//socket.on("move player", onMovePlayer);
	//socket.on("remove player", onRemovePlayer);
};

function onSocketConnected() {
	console.log("Connected to socket server");
	console.log(localPlayer.x);
	socket.emit("new player", {x: localPlayer.x, y: localPlayer.y});
};

function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = data.id;
	remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {
	var movePlayer = playerById(data.id);
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	movePlayer.setXVel(data.xvel);
	movePlayer.setYVel(data.yvel);
};

function onRemovePlayer(data) {
	players.splice(players.indexOf(removePlayer), 1);
};

init();
$.subscribe('canvas/loaded', init);

