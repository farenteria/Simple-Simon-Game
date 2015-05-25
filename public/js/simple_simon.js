"use strict";
(function(){
	var highlightColor;
	var colorClicked;
	var colorButtonsQueue;
	var colors;
	var playing;
	var startButton;
	var index;
	var score;

	//sets and resets values for beginning new game
	function resetValues(){
		highlightColor;
		colorClicked = [];
		colorButtonsQueue = [];
		colors = ["green", "red", "yellow", "blue"];
		playing = false;
		startButton = $("#start-button");
		index = 0;
		score = 0;
	}

	//will be called after user clicks pattern succesfully
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
				break;
			case 1:
				id = $("#red");
				break;
			case 2:
				id = $("#yellow");
				break;
			case 3:
				id = $("#blue");
				break;
		}

		colorButtonsQueue.push(id);
	}

	//when each round starts, Simon will highlight the colors in the order you need to press 
	function iterateColors(){
		//we need to clear this array to check it again with each new round
		colorClicked = [];
		var interval = 700;

		var intervalId = setInterval(function(){
			if(index < colorButtonsQueue.length){
				switch(colorButtonsQueue[index].attr("id")){
					case "green":
						highlightColor = "#12ea45";
						break;
					case "red":
						highlightColor = "#f90909";
						break;
					case "yellow":
						highlightColor = "#ffffd3";
						break;
					case "blue":
						highlightColor = "#4989ff";
						break;
				}

				$(colorButtonsQueue[index]).effect("highlight", {color: highlightColor});
				index++;
				
			} else{
				index = 0;
				clearInterval(intervalId);	
			}
		}, interval);
	}

	//every color click is saved for easy comparison
	function checkClick(event){
		colorClicked.push(event.target.id);

		//this can cause problems if user clicks too quickly. 
		if(colorClicked[index] != colorButtonsQueue[index].attr("id")){
			endGame();
		} else{
			index++;
		}

		/*
			when our index reaches the length of the colorButtonsQueue, the user will have gotten
			the pattern correctly. Thus, our index is reset, and a new round starts.
		*/
		if(index >= colorButtonsQueue.length){
			$("#current-score").text(++score);
			index = 0;
			startRound();
		}
	}

	//Everything will get reset to ready for next game
	function endGame(){
		alert("You lose! Your score is " + score);
		resetValues();
	}

	resetValues();

	startButton.click(function(){
		playing = true;
		$("#green").on("click", checkClick);
		$("#red").on("click", checkClick);
		$("#yellow").on("click", checkClick);
		$("#blue").on("click", checkClick);

		startRound();
	});
})();