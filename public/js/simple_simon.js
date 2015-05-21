"use strict";
(function(){
	var colors = ["green", "red", "yellow", "blue"];
	var playing = false;
	var colorQueue = [];
	var startButton = $("#start-button");

	function playGame(){
		var i = 0;
		var interval = 1000;
		while(i < 5){
			addNewColor();
			console.log(colorQueue);
			i++;

			setInterval(function(){

			}, interval);
		}
	}

	function addNewColor(){
		var random;
		random = Math.floor(Math.random() * colors.length);

		colorQueue.push(colors[random]);
	}

	startButton.click(function(){
		playing = true;
		playGame();
	});
})();