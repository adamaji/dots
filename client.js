var socket = io.connect(window.location.hostname);

socket.on('status', function (data){
	document.getElementById('status').innerHTML = data.status;
});


document.getElementById('reset').onclick = function (){
	socket.emit('reset');
};

