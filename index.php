<html>
	<head>
		<title> MHACKS </title>
		<link rel=stylesheet type="text/css" href="style.css"/>
		<script src="client.js"> </script>
        <script src='//code.jquery.com/jquery-1.7.2.min.js'></script>
        <script src='//localhost:3000/socket.io/socket.io.js'></script>
        <script>
            var socket = io.connect('//localhost:3000');

            socket.on('welcome', function(data) {
                $('#messages').append('<li>' + data.message + '</li>');

                socket.emit('i am client', {data: 'foo!'});
            });
            socket.on('time', function(data) {
                console.log(data);
                $('#messages').append('<li>' + data.time + '</li>');
            });
            socket.on('error', function() { console.error(arguments) });
            socket.on('message', function() { console.log(arguments) });
        </script>		
	</head>
	<body>
		<canvas id="scene" > </canvas>
		<script src="canvas.js"> </script>
		<ul id='messages'></ul>
	</body>
</html>