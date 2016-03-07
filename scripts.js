var player = "X";

function changePlayers() {
	if (player === "X" || player === "") {
		player = "O";
	} else {
		player = "X";
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

