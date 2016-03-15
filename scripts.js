var playerOneMarkings = [];
var playerTwoMarkings = [];
var computer;
var playerMode;
var whosTurn = 1;
var winners = [
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
	];

$(document).ready(function(){
	$('button').click(function() {
		var clickedButton = $(this).attr('id');
		var squares = $('.square');
		if (clickedButton == 'one-player') {
			computer = true;
			playerMode = 1;
			squares.html('');
			enableBoard();
		} else if (clickedButton == 'two-players') {
			computer = false;
			playerMode = 2;
			squares.html('');
			enableBoard();
		} else if (clickedButton == 'start-over') {
			var gameHeader = $('#game-header');
			// returns to Player 1
			whosTurn = 1;
			gameHeader.html("player one's turn");
			gameHeader.removeClass('player-two');
			gameHeader.addClass('player-one');
			// clears all squares
			playerOneMarkings = [];
			playerTwoMarkings = [];
			squares.html('');
			squares.removeClass('winner');
			squares.removeClass('playerOneHasThisSpace');
			squares.removeClass('playerTwoHasThisSpace');
			squares.addClass('empty');
			$('#one-player').prop('disabled', false);
			$('#two-players').prop('disabled', false);
		}
	});

	$('.square').click(function(){
		var element = $(this);
		var gameHeader = $('#game-header');
		if (element.html() == '') {
			//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
			if (whosTurn === 1) {
				element.html('X');
				element.removeClass('empty');
				element.addClass('playerOneHasThisSpace');
				playerOneMarkings.push(element.id);
				whosTurn = 2;
				gameHeader.html("player two's turn");
				gameHeader.removeClass('player-one');
				gameHeader.addClass('player-two');
				checkWin();
				if (checkWin() === true) {
					return; }
				if (computer) {
				computersTurn(); }
		} else if (whosTurn === 2) {
			gameHeader.html("player one's turn");
			gameHeader.removeClass('player-two');
			gameHeader.addClass('player-one');
			element.html('O');
			element.removeClass('empty');
			element.addClass('playerTwoHasThisSpace');
			playerTwoMarkings.push(element.id);
			whosTurn = 1;
			checkWin();
		} else {
			gameHeader.html("This box is taken.");
			gameHeader.addClass('red'); }
		}
	});
});

function enableBoard() {
	var gameHeader = $('#game-header');
	gameHeader.html("player one's turn");
	gameHeader.addClass('player-one');
	gameHeader.addClass('player-two');
	$('button').prop('disabled', false);
}

function computersTurn() {
	var gameHeader = $('#game-header');
	var emptySquares = $('.empty');
	var randomEmptySquare = Math.floor(Math.random() * emptySquares.length);
	var element = emptySquares[randomEmptySquare];
	element.innerHTML = 'O';
	gameHeader.html('');
	gameHeader.html("player one's turn");
	gameHeader.addClass('player-one');
	gameHeader.removeClass('player-two');
	element.classList.remove('empty');
	element.classList.add('playerTwoHasThisSpace');
	playerTwoMarkings.push(element.id);
	whosTurn = 1;
	checkWin();
}

function checkWin() {
	// if rowCount gets to 3, then we have a winner
	var playerOneRowCount = 0;
	var playerTwoRowCount = 0;
	var thisWinCombination = [];
	// loop through all winning combinations
	for (i=0; i<winners.length; i++) {
		playerOneRowCount = 0;
		playerTwoRowCount = 0;
		thisWinCombination = winners[i];
		// check if all elements in the winners array exist in the current player
		for (j=0; j<thisWinCombination.length; j++) {
			if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1) {
				playerOneRowCount++; // if the the index is not -1, then it's in there
			} else if (playerTwoMarkings.indexOf(thisWinCombination[j]) > -1) {
				playerTwoRowCount++;
			}
		}
	if (playerOneRowCount === 3 || playerTwoRowCount === 3) {
		gameOver(thisWinCombination);
		return true; // we need to break out of the outer for-loop when one of the row count variables gets to 3, otherwise the counter will reset
		} 
	}
}

function gameOver(combo) {
	var gameHeader = $('#game-header');
	var theWinner = document.getElementById(combo[0]).innerHTML;
	for (i=0;i<combo.length;i++) {
		document.getElementById(combo[i]).classList.add('winner');
	}
	if (theWinner === "X") {
			gameHeader.removeClass('player-two');
			gameHeader.addClass('player-one');
			if (computer) {
				gameHeader.html("You beat the computer!");
			} else {
				gameHeader.html("Player one won the game!");
			}
	} else if (theWinner === "O") {
			gameHeader.removeClass('player-one');
			gameHeader.addClass('player-two');
			if (computer) {
				gameHeader.html("The computer beat you!");
			} else {
				gameHeader.html("Player two won the game!");
			}
	}
	$('button').prop('disabled', true);
	$('#start-over').prop('disabled', false);
}

var squareWidth = document.getElementById('a1').clientWidth;
var squares = document.getElementsByClassName('square');
for(i=0; i<squares.length; i++){
	squares[i].style.height = squareWidth + 'px';
}