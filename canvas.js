function Player(){
	this.init = function(xpos, ypos){
		this.x = xpos;
		this.y = ypos;
		this.xvel = 0;
		this.yvel = 0;
	}

	this.render = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,10,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	this.update = function(ctx, keys){
		if (keys.indexOf(window.keys.LEFT_ARROW) > -1){
			//this.moveX(-1);
			this.xvel += -1;
		}
		else if (keys.indexOf(window.keys.RIGHT_ARROW) >  -1){
			//this.moveX(1);
			this.xvel += 1;
		}
		if (keys.indexOf(window.keys.UP_ARROW) > -1){
			//this.moveY(-1);
			this.yvel += -1;
		}
		else if (keys.indexOf(window.keys.DOWN_ARROW) >  -1){
			//this.moveY(1);
			this.yvel += 1;
		}

		if (this.xvel > 7){
			this.xvel = 7;
		}
		else if (this.xel < 0){
			this.xvel = 0;
		}
		if (this.yvel > 7){
			this.yvel = 7;
		}
		else if (this.yvel < 0){
			this.yvel = 0;
		}
		
		this.x += this.xvel;
		this.y += this.yvel;
		this.render(ctx);
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
	var pressed = [];

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		players = [];

		resize();

		var newPlayer = new Player();
		newPlayer.init(10,10);
		players.push(newPlayer);

		document.addEventListener('keydown', function(event){
			if (pressed.indexOf(event.keyCode) == -1){
				pressed.push(event.keyCode)
			}
		});
		document.addEventListener('keyup', function(event){
			pressed.splice(pressed.indexOf(event.keyCode));
		});					

		setInterval(update, 30);

	}

	update = function(){
		context.clearRect(0,0,500,500);
		console.log(pressed);
		for (var i=0; i<players.length; i++){
			players[i].update(context,pressed);
		}
	}

	resize = function(){
		canvas.width = 500;
		canvas.height = 500;
	}
}

var newScene = new Scene();
newScene.init();