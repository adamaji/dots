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
	var newPlayer = new Player();
	newPlayer.init(data.x, data.y);
	//newPlayer.setID(this.id);
	newPlayer.id = this.id;
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.x, y: newPlayer.y});
	/*var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.x, y: existingPlayer.y});
	};*/
	players.push(newPlayer);
};

function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	//movePlayer.setX(data.x);
	//movePlayer.setY(data.y);
	movePlayer.x = data.x;
	movePlayer.y = data.y;
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.x, y: movePlayer.y});
	console.log("IN MOVE PLAYER - SERVER");
};

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

function Player(){
	this.init = function(xpos, ypos){
		this.id = "";
		this.x = xpos;
		this.y = ypos;
		this.xvel = 0;
		this.yvel = 0;
		this.radius = 10;
		this.dots = [];
	}

	this.render = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	this.update2 = function(ctx){
		this.render(ctx);
		for (var i=0; i<this.dots.length; i++){
			this.dots[i].update(ctx);
		}		
	}

	this.update = function(ctx, keys){
		if (keys.indexOf(window.keys.LEFT_ARROW) > -1){
			this.xvel += -1;
		}
		else if (keys.indexOf(window.keys.RIGHT_ARROW) >  -1){
			this.xvel += 1;
		}
		if (keys.indexOf(window.keys.UP_ARROW) > -1){
			this.yvel += -1;
		}
		else if (keys.indexOf(window.keys.DOWN_ARROW) >  -1){
			this.yvel += 1;
		}

		var tempx = this.x;
		var tempy = this.y;
		for(var i=0; i<this.dots.length; i++){
			tempx2 = this.dots[i].x;
			tempy2 = this.dots[i].y;
			this.dots[i].x = tempx;
			this.dots[i].y = tempy;
			tempx = tempx2;
			tempy = tempy2;
 		}

		this.x += this.xvel;
		this.y += this.yvel;
		if (this.x < 0){
			this.x = 0;
			this.xvel = 0;
		}
		if (this.x > 1000){
			this.x = 1000;
			this.xvel = 0;
		}
		if (this.y < 0){
			this.y = 0;
			this.yvel = 0;
		}
		if (this.y > 650){
			this.y = 650;
			this.yvel = 0;
		}		
		this.render(ctx);
		for (var i=0; i<this.dots.length; i++){
			this.dots[i].update(ctx);
		}
	}

	this.addDot = function(x,y){
		this.dots.push(new Dot(x, y));
	}
}
setEventHandlers();

