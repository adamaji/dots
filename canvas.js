function Scene(){

	this.init = function(){
		canvas = document.getElementById("scene");
		context = canvas.getContext('2d');

		resize();

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