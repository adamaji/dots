function Player(){
	this.init = function(xpos, ypos){
		this.x = xpos;
		this.y = ypos;

		document.addEventListener('keydown', function(event){
			if (event.keyCode == window.keys.LEFT_ARROW){
				this.x -= 1;
			}
			else if (event.keyCode == window.keys.RIGHT_ARROW){
				this.x += 1;
			}
			if (event.keyCode == window.keys.UP_ARROW){
				this.y -= 1;

			}
			else if (event.keyCode == window.keys.DOWN_ARROW){
				this.y += 1;
			}
		});		
	}

	this.render = function(){
		context.beginPath();
		context.arc(this.x,this.y,10,0,2*Math.PI);
		context.fill();
		context.closePath();
	}

}

function Scene(){

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		resize();

		var newPlayer = new Player();
		newPlayer.init(10,10);

		setInterval(newPlayer.render(), 30);

	}

	resize = function(){
		canvas.width = 500;
		canvas.height = 500;
	}
}

var newScene = new Scene();
newScene.init();