var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app, {origins: '*:*'});
 
var redis = require("redis");
client = redis.createClient();
 
app.listen(8080);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

function handler(req, res) {
    res.writeHead(200);
    res.end("Hello Socket");
}

