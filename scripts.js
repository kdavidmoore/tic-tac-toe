var playerOneMarkings = [];
var playerTwoMarkings = [];
var computer;
var whosTurn = 1;
var rowSize;
var winners = [];
/* var winners = [
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
	]; */

$(document).ready(function(){
	$('.choice-button').click(function() {
		var clickedButton = $(this).attr('id');
		var squares = $('.square');
		if (clickedButton == 'nine') {
			// draw a 3 x 3 grid
			rowSize = 3;
			makeWinnersArray();
		} else if (clickedButton == 'sixteen') {
			// draw a 4 x 4 grid
			rowSize = 4;
			makeWinnersArray();
		} else if (clickedButton == 'twenty-five') {
			// draw a 5 x 5 grid
			rowSize = 5;
			makeWinnersArray();
		} else if (clickedButton == 'one-player') {
			whosTurn = 1;
			computer = true;
			console.log(whosTurn);
			console.log(computer);
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
			$('#new-game').prop('disabled', false);
		}
	});

	// this square-click event listener is broken...doesn't even get to the if statements
	$('.square').click(function() {
		var element = $(this);
		var elementID = element.attr('id');
		console.log('You clicked on the square, ' + elementID);
		var gameHeader = $('#game-header');
		if (element.hasClass('empty')) {
			if (whosTurn === 1) {
				element.html('X');
				element.addClass('blink');
				element.removeClass('empty');
				element.addClass('playerOneHasThisSpace');
				gameHeader.html("player two's turn");
				playerOneMarkings.push(elementID);
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

function makeWinnersArray() {
	for (i=0; i<rowSize; i++) {
		winners[i] = [];
		for (j=0; j<rowSize; j++) {
			winners[i].push(i + ' ' + j);
		}
	}
	drawGrid();
	nextChoices();
}

function drawGrid(){
	if (rowSize === 3) {
		$('#board-wrapper').html("<div class='row' id='row1'><button disabled class='left square empty' id='a1'></button><button disabled class='square empty' id='a2'></button><button disabled class='square empty' id='a3'></button></div><div class='row' id='row2'><button disabled class='left square empty' id='b1'></button><button disabled class='square empty' id='b2'></button><button disabled class='square empty' id='b3'></button></div><div id='row3'><button disabled class='left square empty' id='c1'></button><button disabled class='square empty' id='c2'></button><button disabled class='square empty' id='c3'></button></div>");
		$('.square').width('30%');
		$('#row3').addClass('last-row');
	} else if (rowSize === 4) {
		$('#board-wrapper').html("<div class='row' id='row1'><button disabled class='left square empty' id='a1'></button><button disabled class='square empty' id='a2'></button><button disabled class='square empty' id='a3'></button><button disabled class='square empty' id='a4'></button></div><div class='row' id='row2'><button disabled class='left square empty' id='b1'></button><button disabled class='square empty' id='b2'></button><button disabled class='square empty' id='b3'></button><button disabled class='square empty' id='b4'></button></div><div class='row' id='row3'><button disabled class='left square empty' id='c1'></button><button disabled class='square empty' id='c2'></button><button disabled class='square empty' id='c3'></button><button disabled class='square empty' id='c4'></button></div><div id='row4'><button disabled class='left square empty' id='d1'></button><button disabled class='square empty' id='d2'></button><button disabled class='square empty' id='d3'></button><button disabled class='square empty' id='d4'></button></div>");
		$('.square').width('21.22%');
		$('#row4').addClass('last-row');
		$('#a4').addClass('right-side');
		$('#b4').addClass('right-side');
		$('#c4').addClass('right-side');
		$('#d4').addClass('right-side');
	} else if (rowSize === 5) {
		$('#board-wrapper').html("<div class='row' id='row1'><button disabled class='left square empty' id='a1'></button><button disabled class='square empty' id='a2'></button><button disabled class='square empty' id='a3'></button><button disabled class='square empty' id='a4'></button><button disabled class='square empty' id='a5'></button></div><div class='row' id='row2'><button disabled class='left square empty' id='b1'></button><button disabled class='square empty' id='b2'></button><button disabled class='square empty' id='b3'></button><button disabled class='square empty' id='b4'></button><button disabled class='square empty' id='b5'></button></div><div class='row' id='row3'><button disabled class='left square empty' id='c1'></button><button disabled class='square empty' id='c2'></button><button disabled class='square empty' id='c3'></button><button disabled class='square empty' id='c4'></button><button disabled class='square empty' id='c5'></button></div><div class='row' id='row4'><button disabled class='left square empty' id='d1'></button><button disabled class='square empty' id='d2'></button><button disabled class='square empty' id='d3'></button><button disabled class='square empty' id='d4'></button><button disabled class='square empty' id='d5'></button></div><div id='row5'><button disabled class='left square empty' id='e1'></button><button disabled class='square empty' id='e2'></button><button disabled class='square empty' id='e3'></button><button disabled class='square empty' id='e4'></button><button disabled class='square empty' id='e5'></button></div>");	
		$('.square').width('16%');
		$('#row5').addClass('last-row');
		$('#a5').addClass('right-side');
		$('#b5').addClass('right-side');
		$('#c5').addClass('right-side');
		$('#d5').addClass('right-side');
		$('#e5').addClass('right-side');
	}
	setSquareHeight();
}

function nextChoices() {
	$('#nine').addClass('hidden');
	$('#sixteen').addClass('hidden');
	$('#twenty-five').addClass('hidden');
	$('#one-player').removeClass('hidden');
	$('#two-players').removeClass('hidden');
	$('#new-game').removeClass('hidden');
	$('#game-header').html("How many players?");
}

function enableBoard() {
	$('#game-header').html("player one's turn");
	$('.square').prop('disabled', false);
	console.log("Squares successfully enabled.");
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
		if (playerOneRowCount === rowSize || playerTwoRowCount === rowSize) {
			gameOver(thisWinCombination);
			return true; // need to break out of the outer for-loop when one of the row count variables gets to 3, otherwise the counter will reset
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

function setSquareHeight() {
	var squareWidth = $('.left').width();
	var squares = $('.square');
	var squareHeight = (squareWidth*0.5) + 'px';
	squares.height(squareHeight);
}