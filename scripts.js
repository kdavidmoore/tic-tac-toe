// make an array of arrays specifying winning board combos
var winners = [
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['a3','b2','c1']
];

var player = "X"; // starts with Player 1 (Xs)
var playerLabel = document.getElementById("game-header");
playerLabel.innerHTML = "Player 1";

function makeMove(element) {
	var playerLabel = document.getElementById("game-header");
	
	if (element.value === "") {
		playerLabel.style.backgroundColor = "#009999";
		element.value = player;
		
		if (player === "X") {
		player = "O";
		playerLabel.innerHTML = "Player 2";
		} else {
			player = "X";
			playerLabel.innerHTML = "Player 1";
		}
	} else {
		playerLabel.style.backgroundColor = "red";
		playerLabel.innerHTML = "That square is taken.";
	}
}

function startOver() {
	// returns to Player 1
	player = "X";
	var gameHeader = document.getElementById("game-header");
	gameHeader.innerHTML = "Player 1";
	gameHeader.style.backgroundColor = "#009999";
	
	// clears all squares
	var squares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
	var resetSquares = [];
	for (i = 0; i < squares.length; i++) {
		resetSquares.push(document.getElementById(squares[i]));
		resetSquares[i].value = "";
	}
}