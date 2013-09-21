var host = process.env.HOST, port = process.env.PORT || 8080;
var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app);

app.listen(port);

io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});

function handler(req, res) {
	res.writeHead(200);
	res.end(req);
}

