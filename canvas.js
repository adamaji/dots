function Player(){
	this.init = function(xpos, ypos){
		this.x = xpos;
		this.y = ypos;
	}

	this.render = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,10,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	this.moveX = function(x){
		this.x += x;
	}

	this.moveY = function(y){
		this.y += y;
	}

}

function Scene(){

	var canvas, context;

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		players = [];

		resize();

		var newPlayer = new Player();
		newPlayer.init(10,10);
		players.push(newPlayer);

		document.addEventListener('keydown', function(event){
			if (event.keyCode == window.keys.LEFT_ARROW){
				newPlayer.moveX(-5);
			}
			else if (event.keyCode == window.keys.RIGHT_ARROW){
				newPlayer.moveX(5);
			}
			if (event.keyCode == window.keys.UP_ARROW){
				newPlayer.moveY(-5);
			}
			else if (event.keyCode == window.keys.DOWN_ARROW){
				newPlayer.moveY(5);
			}
		});		

		setInterval(update, 30);

	}

	update = function(){
		context.clearRect(0,0,500,500);
		for (var i=0; i<players.length; i++){
			players[i].render(context);
		}
	}

	resize = function(){
		canvas.width = 500;
		canvas.height = 500;
	}
}

var newScene = new Scene();
newScene.init();