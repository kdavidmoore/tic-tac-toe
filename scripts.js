var player = "X"; // starts with Player 1 (Xs) 

function changePlayers(element) {
	if (player === "X" || player === "") {
		player = "O";
		element.value = "Player 2";

	} else {
		player = "X";
		element.value = "Player 1";
	}

	console.log(player);
}

function makeMove(element) {
	if (element.value === "") {
		element.value = player;
	} else {
		console.log("Don't do that.");
	}

	console.log(element.value);
}

function startOver() {
	// returns to Player 1
	player = "X";
	var playerButton = document.getElementById('player-button');
	playerButton.value = "Player 1";
	
	// clears all squares
	var squares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
	var resetSquares = [];
	for (i = 0; i < squares.length; i++) {
		resetSquares.push(document.getElementById(squares[i]));
		resetSquares[i].value = "";
	}
}