"use strict";
(function(){
	var highlightColor;
	var colorClicked;
	var colorButtonsQueue;
	var totalColors;
	var playing;
	var startButton  = $("#start-button");
	var index;
	var score;

	//sets and resets values for beginning new game
	function resetValues(){
		highlightColor = "";
		colorClicked = [];
		colorButtonsQueue = [];
		totalColors = 4; 
		playing = false;
		index = 0;
		score = 0;

		$("#current-score").text(score);
	}

	//will be called after user clicks pattern succesfully
	function startRound(){
		if(playing){
			addNewColor();
			iterateColors();
		}
	}

	// a random color will be pushed to our colorButtonsQueue array
	function addNewColor(){
		var id;
		var random = Math.floor(Math.random() * totalColors);

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

		//don't run the checkClick method until we have finished highlighting all colors in colorButtonQueue
		$("#green").off();
		$("#red").off();
		$("#yellow").off();
		$("#blue").off();

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

		//now that the highlighting has finished, we can safely add the even handlers
		$("#green").on("click", checkClick);
		$("#red").on("click", checkClick);
		$("#yellow").on("click", checkClick);
		$("#blue").on("click", checkClick);
	}

	//every color click is saved for easy comparison
	function checkClick(event){
		colorClicked.push(event.target.id);

		//this can cause problems if user clicks too quickly, or in between games 
		if(colorClicked[index] != colorButtonsQueue[index].attr("id")){
			endGame();
		} else{
			index++;
		}

		/*
			when our index reaches the length of the colorButtonsQueue, the user will have gotten
			the pattern correctly. Thus, our index is reset, and a new round starts.
		*/
		if(index >= colorButtonsQueue.length && playing){
			$("#current-score").text(++score);
			index = 0;
			startRound();
		}
	}

	//Everything will get reset to ready for next game
	function endGame(){
		//so clicking won't interfere after game.
		$("#green").off("click");
		$("#red").off("click");
		$("#yellow").off("click");
		$("#blue").off("click");

		alert("You lose! Your score is " + score);

		playing = false;
		resetValues();

		// console.log($("#current-score").text());
		$("#start-button").text("Play Again?");
	}

	//We use this as our setter for initial click
	resetValues();

	startButton.click(function(){
		playing = true;
		startRound();
	});
})();