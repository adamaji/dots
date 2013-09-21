var express = require('express'),
	app = express.createServer(express.logger()),
	io = require('socket.io').listen(app);

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var status = "All is well.";

io.sockets.on('connection', function (socket) {
	io.sockets.emit('status', { status: status });
	socket.on('reset', function (data) {
		status = "War is imminent!";
		io.sockets.emit('status', { status: status });
	});
});

