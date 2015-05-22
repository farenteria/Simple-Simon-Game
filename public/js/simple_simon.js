"use strict";
(function(){
	var colors = ["green", "red", "yellow", "blue"];
	var playing = false;
	var startButton = $("#start-button");
	var colorButtonsQueue = [];
	var index = 0;
	var highlightColor;
	var colorClicked;

	function playGame(){
		addNewColor();
		iterateColors();
	}

	// a random color will be pushed to our colorButtonsQueue array
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

	//when each round starts, Simon will highlight the colors in the order you need to press 
	function iterateColors(){
		var interval = 1000;

		var intervalId = setInterval(function(){
			if(index < colorButtonsQueue.length){
				$(colorButtonsQueue[index]).effect("highlight", highlightColor);
				index++;
			} else{
				clearInterval(intervalId);
				console.log("done");
			}
		}, interval);

		index = 0;
	}

	function saveClick(event){
		colorClicked = event.target.id;
	}

	startButton.click(function(){
		playing = true;
		$("#green").click(saveClick);
		$("#red").click(saveClick);
		$("#yellow").click(saveClick);
		$("#blue").click(saveClick);

		playGame();
	});
})();