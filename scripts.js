var player = "X";

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

