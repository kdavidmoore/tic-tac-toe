var playerOneMarkings = [];
var playerTwoMarkings = [];
var computer;
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

/* var winners = [];
var gridSize = 5;
for (i=0; i<gridSize; i++) {
	for (j=0; j<gridSize; i++) {
		winners[i].push('a' + j);
	}
}
console.log(winners); */


// make sure the squares have some height before we add Xs and Os
var squareWidth = $('.left').width();
var squares = $('.square');
var squareHeight = (squareWidth*0.5) + 'px';
squares.height(squareHeight);


$(document).ready(function(){
	$('.choice-button').click(function() {
		var clickedButton = $(this).attr('id');
		var squares = $('.square');
		if (clickedButton == 'one-player') {
			whosTurn = 1;
			computer = true;
			squares.html('');
			enableBoard();
		} else if (clickedButton == 'two-players') {
			whosTurn = 1;
			computer = false;
			squares.html('');
			enableBoard();
		} else if (clickedButton == 'new-game') {
			// reset game-header
			var gameHeader = $('#game-header');
			gameHeader.html("How many players?");
			// clear all squares
			playerOneMarkings = [];
			playerTwoMarkings = [];
			squares.html('');
			squares.removeClass('winner');
			squares.removeClass('playerOneHasThisSpace');
			squares.removeClass('playerTwoHasThisSpace');
			squares.addClass('empty');
			$('button').prop('disabled', true);
			$('#one-player').prop('disabled', false);
			$('#two-players').prop('disabled', false);
		}
	});

	$('.square').click(function(){
		var element = $(this);
		var elementID = element.attr('id');
		var gameHeader = $('#game-header');
		if (element.html() == '') {
			//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
			if (whosTurn === 1) {
				element.html('X');
				element.addClass('blink');
				element.removeClass('empty');
				element.addClass('playerOneHasThisSpace');
				gameHeader.html("player two's turn");
				playerOneMarkings.push(elementID);
				console.log(playerOneMarkings);
				checkWin();
				whosTurn = 2;
				if (checkWin() === true) {
					return; }
				if (computer) {
				computersTurn(); }
		} else if (whosTurn === 2) {
			gameHeader.html("player one's turn");
			element.html('O');
			element.addClass('blink');
			element.removeClass('empty');
			element.addClass('playerTwoHasThisSpace');
			playerTwoMarkings.push(elementID);
			checkWin();
			whosTurn = 1;
		} else {
			gameHeader.html("This box is taken."); 
			}
		}
	});
});

function enableBoard() {
	var gameHeader = $('#game-header');
	gameHeader.html("player one's turn");
	$('button').prop('disabled', false);
}

function computersTurn() {
	var gameHeader = $('#game-header');
	var emptySquares = $('.empty');
	var randomEmptySquare = Math.floor(Math.random() * emptySquares.length);
	var element = emptySquares[randomEmptySquare];
	var elementID = element.getAttribute('id');
	element.innerHTML = 'O';
	element.classList.add('blink');
	gameHeader.html('');
	gameHeader.html("player one's turn");
	element.classList.remove('empty');
	element.classList.add('playerTwoHasThisSpace');
	playerTwoMarkings.push(elementID);
	checkWin();
	whosTurn = 1;
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
				console.log(playerOneRowCount);
			} else if (playerTwoMarkings.indexOf(thisWinCombination[j]) > -1) {
				playerTwoRowCount++;
			}
		if (playerOneRowCount === 3 || playerTwoRowCount === 3) {
			gameOver(thisWinCombination);
			return true; // we need to break out of the outer for-loop when one of the row count variables gets to 3, otherwise the counter will reset
			} 
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
	$('#new-game').prop('disabled', false);
}