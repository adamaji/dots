function Scene(){

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		resize();

		context.beginPath();
		context.arc(10,10,5,0,2*Math.PI);
		context.fill();
		context.closePath();
	}

	resize = function(){
		width = window.innerWidth;
		height = window.innerHeight;

		canvas.width = width;
		canvas.height = height;
	}
}

var newScene = new Scene();
newScene.init();