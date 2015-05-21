"use strict";
(function(){
	var colors = ["green", "red", "yellow", "blue"];
	var playing = false;
	var colorQueue = [];
	var startButton = $("#start-button");
	var colorButtonsQueue = [];
	var index = 0;
	var highlightColor;
	// var intervalId;

	function playGame(){
		var i = 0;
		var interval = 1000;

		//change to playing
		while(i < 5){
			addNewColor();
			i++;

			var intervalId = setInterval(function(){
				if(index < colorButtonsQueue.length){
					highlighter();
					console.log("colorButtonsQueue[index].html + highlighted");
					index++;
				} else{
					clearInterval(intervalId);
					console.log(colorButtonsQueue.length);
				}
			}, interval);

			index = 0;
		}
	}

	// a random color will be pushed to our colorButtons array
	function addNewColor(){
		var id;
		var random = Math.floor(Math.random() * colors.length);

		switch(random){
			case 0:
				id = $("#green");
				highlightColor = "#12ea45";
				break;
			case 1:
				id = $("#red");
				highlightColor = "#f90909";
				break;
			case 2:
				id = $("#yellow");
				highlightColor = "#ffffd3";
				break;
			case 3:
				id = $("#blue");
				highlightColor = "#4989ff";
				break;
		}

		colorButtonsQueue.push(id);
	}

	function highlighter(){
		$(colorButtonsQueue[index]).effect("highlight", highlightColor);
	}

	startButton.click(function(){
		playing = true;
		playGame();
	});
})();