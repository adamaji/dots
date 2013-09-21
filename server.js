var host = process.env.HOST, port = 8080;
var app = require('http').createServer()
	, io = require('socket.io').listen(app);

//var url = require("url").parse(process.env.OPENREDIS_URL);
//var redis = require("redis").createClient(url.port, url.hostname);
//redis.auth(url.auth.split(":")[1]);

var redis = require("redis").createClient(15994, "pub-redis-15994.us-east-1-4.3.ec2.garantiadata.com");
redis.auth("9BrvTFM4UKa3c1gU");

app.listen(port, host);

io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});

function handler(req, res) {
	res.writeHead(200);
	res.end("Hello Socket");
}

