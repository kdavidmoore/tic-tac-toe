var player = 'X';

function changePlayers() {
	if (player === 'X' or player === '') {
		player = "O";
	} else {
		player = "X";
	}
	return player;
}

function makeMove(element) {
	var squareVal = document.this;
	var player = changePlayers();
}