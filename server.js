var host = process.env.HOST, port = 8080;
var app = require('http').createServer()
  , io = require('socket.io').listen(app);
 
var redis = require("redis");
client = redis.createClient();
 
app.listen(port, host);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

function handler(req, res) {
    res.writeHead(200);
    res.end("Hello Socket");
}

