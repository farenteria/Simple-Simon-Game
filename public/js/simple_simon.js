"use strict";
(function(){
	var colors = ["green", "red", "yellow", "blue"];
	var playing = false;
	var startButton = $("#start-button");
	var colorButtonsQueue = [];
	var index = 0;
	var delay = 5000;
	var score = 0;
	var highlightColor;
	var colorClicked = [];

	function startRound(){
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
		var interval = 700;

		var intervalId = setInterval(function(){
			if(index < colorButtonsQueue.length){
				$(colorButtonsQueue[index]).effect("highlight", highlightColor);
				index++;
			} else{
				index = 0;
				clearInterval(intervalId);
				console.log(index);
			}
		}, interval);
	}

	//every color click is saved for easy comparison
	function checkClick(event){
		colorClicked.push(event.target.id);

		console.log(index);
		if(colorClicked[index] != colorButtonsQueue[index].attr("id")){
			endGame();
		} else{
			index++;
			console.log(index);
		}

		if(index >= colorButtonsQueue.length){
			$("#current-score").text(++score);
			startRound();
		} 

		console.log(colorClicked);
		console.log(colorButtonsQueue);
	}

	function endGame(){
		console.log("lose");
	}

	startButton.click(function(){
		playing = true;
		$("#green").on("click", checkClick);
		$("#red").on("click", checkClick);
		$("#yellow").on("click", checkClick);
		$("#blue").on("click", checkClick);

		startRound();
	});
})();