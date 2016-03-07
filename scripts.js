var player = "X";

function changePlayers() {
	if (player === "X" || player === "") {
		player = "O";
	} else {
		player = "X";
	}
}

function makeMove(element) {
	var squareVal = element.value;
	
	if (squareVal === "") {
		squareVal = player;
	} else {
		console.log("Don't do that.");
	}
}

console.log(player);