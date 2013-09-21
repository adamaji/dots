collide = function(obj1, obj2){
	if ((obj1.x + obj1.radius >= obj2.x)&&(obj1.x + obj1.radius <= obj2.x + obj2.radius)){
		if (((obj1.y + obj1.radius >= obj2.y)&&(obj1.y + obj1.radius <= obj2.y + obj2.radius))||((obj1.y - obj1.radius <= obj2.y)&&(obj1.y - obj1.radius >= obj2.y - obj2.radius))){
			return true;
		}
	}
	else if ((obj1.x - obj1.radius <= obj2.x)&&(obj1.x - obj1.radius >= obj2.x - obj2.radius)){
		if (((obj1.y + obj1.radius >= obj2.y)&&(obj1.y + obj1.radius <= obj2.y + obj2.radius))||((obj1.y - obj1.radius <= obj2.y)&&(obj1.y - obj1.radius >= obj2.y - obj2.radius))){
			return true;
		}
	}
	return false;
}

function Explosion(x, y){
	this.x = x;
	this.y = y;
	this.radius = 0;
	
	this.update = function(ctx){
		if (this.radius < 100){
			for (var i=0; i<8; i++){
				ctx.beginPath();
				ctx.arc(this.x+Math.cos(i * (Math.PI / 4))*this.radius,this.y+Math.sin(i * (Math.PI / 4))*this.radius,3,0,2*Math.PI);
				ctx.fill();
				ctx.closePath();			
			}
			this.radius += 5;
		}
	}
}

function Dot(x, y){
	this.x = x;
	this.y = y;
	this.radius = 5;

	this.update = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();		
	}

}

function Player(){
	this.init = function(xpos, ypos){
		this.x = xpos;
		this.y = ypos;
		this.xvel = 0;
		this.yvel = 0;

		this.radius = 10;
	}

	this.render = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	this.update = function(ctx, keys){
		if (keys.indexOf(window.keys.LEFT_ARROW) > -1){
			this.xvel += -1;
		}
		else if (keys.indexOf(window.keys.RIGHT_ARROW) >  -1){
			this.xvel += 1;
		}
		if (keys.indexOf(window.keys.UP_ARROW) > -1){
			this.yvel += -1;
		}
		else if (keys.indexOf(window.keys.DOWN_ARROW) >  -1){
			this.yvel += 1;
		}

		if (this.xvel > 5){
			this.xvel = 5;
		}
		else if (this.xel < -5){
			this.xvel = -5;
		}
		if (this.yvel > 5){
			this.yvel = 5;
		}
		else if (this.yvel < -5){
			this.yvel = -5;
		}

		this.x += this.xvel;
		this.y += this.yvel;
		this.render(ctx);
	}

}

function Scene(){

	var canvas, context;
	var pressed = [];
	var width = 1000;
	var height = 650;

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');	

		players = [];
		dots = [];
		explosions = [];

		resize();

		var newPlayer = new Player();
		newPlayer.init(10,10);
		players.push(newPlayer);

		for (var i=0; i<10; i++){
			dots.push(new Dot(Math.random() * width, Math.random() * height));
		}

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
		context.clearRect(0,0,width,height);
		console.log(pressed);
		for (var i=0; i<players.length; i++){
			context.fillStyle = '#000000';
			context.strokeStyle = '#000000';				
			players[i].update(context,pressed);
		}
		for (var i=0; i<dots.length; i++){
			context.fillStyle = '#33AAFF';
			context.strokeStyle = '#000000';				
			if (collide(dots[i], players[0])){
				explosions.push(new Explosion(dots[i].x,dots[i].y));
				dots.splice(dots.indexOf(dots[i]),1);
			}
			dots[i].update(context);
		}
		for (var i=0; i<explosions.length; i++){
			explosions[i].update(context);
		}

		if (dots.length < 10){
			dots.push(new Dot(Math.random() * width, Math.random() * height));
		}
	}

	resize = function(){
		width = 1000;//window.innerWidth;
		height = 650;//window.innerHeight;

		canvas.width = width;
		canvas.height = height;
	}
}

var newScene = new Scene();
newScene.init();