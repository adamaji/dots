function Scene(){

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		resize();

		document.addEventListener('keydown', function(event){
			if (event.keyCode == window.keys.LEFT_ARROW){
				//left
				alert("left");
			}
			else if (event.keyCode == window.keys.RIGHT_ARROW){
				//right
				alert("right");
			}
			if (event.keyCode == window.keys.UP_ARROW){
				//up
				alert("up");
			}
			else if (event.keyCode == window.keys.DOWN_ARROW){
				//down
				alert("down");
			}
		});

		context.beginPath();
		context.arc(10,10,10,0,2*Math.PI);
		context.fill();
		context.closePath();
	}

	resize = function(){
		canvas.width = 500;
		canvas.height = 500;
	}
}

var newScene = new Scene();
newScene.init();