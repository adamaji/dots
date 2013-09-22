var localPlayer;
var remotePlayers = [];

collide = function(obj1, obj2){
	if ( Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y-obj1.y, 2) <= Math.pow(obj1.radius + obj2.radius, 2)){
		return true;
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

function Spike(x, y){
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
		this.id = "";
		this.x = xpos;
		this.y = ypos;
		this.xvel = 0;
		this.yvel = 0;
		this.radius = 10;
		this.dots = [];
	}

	this.render = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	this.update = function(ctx){
		this.render(ctx);
		for (var i=0; i<this.dots.length; i++){
			this.dots[i].update(ctx);
		}		
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

		var tempx = this.x;
		var tempy = this.y;
		for(var i=0; i<this.dots.length; i++){
			tempx2 = this.dots[i].x;
			tempy2 = this.dots[i].y;
			this.dots[i].x = tempx;
			this.dots[i].y = tempy;
			tempx = tempx2;
			tempy = tempy2;
 		}

		this.x += this.xvel;
		this.y += this.yvel;
		if (this.x < 0){
			this.x = 0;
			this.xvel = 0;
		}
		if (this.x > 1000){
			this.x = 1000;
			this.xvel = 0;
		}
		if (this.y < 0){
			this.y = 0;
			this.yvel = 0;
		}
		if (this.y > 650){
			this.y = 650;
			this.yvel = 0;
		}		
		this.render(ctx);
		for (var i=0; i<this.dots.length; i++){
			this.dots[i].update(ctx);
		}
	}

	this.addDot = function(x,y){
		this.dots.push(new Dot(x, y));
	}
}

Player.prototype.setX = function(a){
	this.x = a;
};

Player.prototype.setY = function(a){
	this.y = a;
};

Player.prototype.setXVel = function(a){
	this.xvel = a;
};

Player.prototype.setYVel = function(a){
	this.yvel = a;
};

Player.prototype.setID = function(a){
	this.id = a;
};

function Scene(){

	var canvas, context;
	var pressed = [];
	var width = 1000;
	var height = 650;

	this.init = function(){
		console.log("canvas init");
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');	

		remotePlayers = [];
		dots = [];
		spikes = [];
		explosions = [];

		resize();

		localPlayer = new Player();
		localPlayer.init(10,10);
		//newPlayer.init(10,10);
		//players.push(newPlayer);

		for (var i=0; i<10; i++){
			dots.push(new Dot(Math.random() * width, Math.random() * height));
		}
		for (var i=0; i<5; i++){
			spikes.push(new Spike(Math.random() * width, Math.random() * height));
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
		$.publish('canvas/loaded');
	}

	update = function(){
		context.clearRect(0,0,width,height);
		context.fillStyle = '#000000';
		context.strokeStyle = '#000000';		
		localPlayer.update(context,pressed);
		for (var i=0; i<remotePlayers.length; i++){				
			remotePlayers[i].update(context);
		}
		for (var i=0; i<spikes.length; i++){
			context.fillStyle = '#FF1177';
			context.strokeStyle = '#000000';
			if (collide(spikes[i], localPlayer)){
				spikes.splice(spikes.indexOf(spikes[i]),1);
				localPlayer.dots.pop();
			}	
			spikes[i].update(context);
		}		
		for (var i=0; i<dots.length; i++){
			context.fillStyle = '#33AAFF';
			context.strokeStyle = '#000000';				
			if (collide(dots[i], localPlayer)){
				explosions.push(new Explosion(dots[i].x,dots[i].y));
				localPlayer.addDot(dots[i].x, dots[i].y);
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
		if (spikes.length < 5){
			spikes.push(new Spike(Math.random() * width, Math.random() * height));
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

