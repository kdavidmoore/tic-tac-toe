$(window).load(function(){
	var aOne = $('#a1');
	var squareWidth = aOne.clientWidth;
	var squares = $('.square');
	squares.style.height = squareWidth + 'px';
});

$(document).ready(function(){

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

/* var whosTurn = 1 */
var playerOneMarkings = [];
var playerTwoMarkings = [];
var computer;
var playerMode;
var whosTurn = 1;

function enableBoard() {
	var gameHeader = $('#game-header');
	gameHeader.innerHTML = "player one's turn";
	gameHeader.classList.add('player-one');
	gameHeader.classList.remove('player-two');
	var buttons = $('button');
	buttons.disabled = false;
	var onePlayer = $('#one-player');
	var twoPlayers = $('#two-players');
	onePlayer.disabled = true;
	twoPlayers.disabled = true;
}

$('#one-player').click(function(){
	var gameHeader = $('#game-header');
	computer = true;
	playerMode = 1;
	enableBoard();
});

$('#two-players').click(function(){
	computer = false;
	playerMode = 2;
	enableBoard();
});

$('.square').click(function() {
	var element = $(this);
	var gameHeader = $('#game-header');
	if (element.innerHTML == '') {
		//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
		if (whosTurn === 1) {
			element.innerHTML = 'X';
			element.classList.remove('empty');
			element.classList.add('playerOneHasThisSpace');
			playerOneMarkings.push(element.id);
			whosTurn = 2;
			gameHeader.innerHTML = '';
			gameHeader.innerHTML = "player two's turn";
			gameHeader.classList.add('player-two');
			gameHeader.classList.remove('player-one');
			checkWin();
			if (checkWin() === true) {
				return; }
			if (computer) {
			computersTurn(); }
	} else if (whosTurn === 2) {
		gameHeader.innerHTML = '';
		gameHeader.innerHTML = "player one's turn";
		gameHeader.classList.add('player-one');
		gameHeader.classList.remove('player-two');
		element.innerHTML = 'O';
		element.classList.remove('empty');
		element.classList.add('playerTwoHasThisSpace');
		playerTwoMarkings.push(element.id);
		whosTurn = 1;
		checkWin();
	} else {
		gameHeader.innerHTML = "This box is taken.";
		gameHeader.className = 'red'; }
	}
});

function computersTurn() {
	var gameHeader = $('#game-header');
	var emptySquares = $('.empty');
	var randomEmptySquare = Math.floor(Math.random() * emptySquares.length);
	console.log("length of array: " + emptySquares.length);
	console.log("random empty square: " + randomEmptySquare);
	var element = emptySquares[randomEmptySquare];
	element.innerHTML = 'O';
	gameHeader.innerHTML = '';
	gameHeader.innerHTML = "player one's turn";
	gameHeader.classList.add('player-one');
	gameHeader.classList.remove('player-two');
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
			gameHeader.classList.remove('player-two');
			gameHeader.classList.add('player-one');
			if (computer) {
				gameHeader.innerHTML = "You beat the computer!";
			} else {
				gameHeader.innerHTML = "Player one won the game!";
			}
	} else if (theWinner === "O") {
			gameHeader.classList.remove('player-one');
			gameHeader.classList.add('player-two');
			if (computer) {
				gameHeader.innerHTML = "The computer beat you!";
			} else {
				gameHeader.innerHTML = "Player two won the game!";
			}
	}
	var buttons = $('button');
	buttons.disabled = true;
	var startOver = $('#start-over');
	startOver.disabled = false;
}

$('#start-over').click(function() {
	var gameHeader = $('#game-header');
	// returns to Player 1
	whosTurn = 1;
	gameHeader.innerHTML = "player one's turn";
	gameHeader.classList.add('player-one');
	gameHeader.classList.remove('player-two');
	// clears all squares
	playerOneMarkings = [];
	playerTwoMarkings = [];
	var squares = $('.square');
	squares.innerHTML = '';
	squares.classList.remove('winner');
	squares.classList.remove('playerOneHasThisSpace');
	squares.classList.remove('playerTwoHasThisSpace');
	squares.classList.add('empty');
	var onePlayer = $('#one-player');
	var twoPlayers = $('#two-players');
	onePlayer.disabled = false;
	twoPlayers.disabled = false;
});
});