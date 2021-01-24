// Assignment2.js  - Game of War
// Author: Ayelet Danieli

'use strict';
const { throws } = require('assert');
const input = require('readline-sync');

////////////////////////////////////////////////
// Opening title
const title =	`

///////////////// Welcome to War Game \\\\\\\\\\\\\\\\\\\
|                                                        |
|            _______                 _______             |
|           |2      |    _______    |9      |            |
|           |       |   |5      |   |       |            |
|           |  V    |   |       |   |   V   |            | 
|           |	    |   |   V   |   |       |            | 
|           |_____ 2|   |       |   |_____ 9|            | 
|                       |______5|                        |
|                                                        |
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\

`;



//var suits = [spade, diamond, club, heart];
var Suits = ['\u2660', '\u2666', '\u2663', '\u2764'];
var Values = ["2 ", "3 ", "4 ", "5 ", "6 ", "7 ", "8 ", "9 ", "10", "11", "12", "13"];
///////////////////////////////////////////////////////////////////////////////////////
// card class: represents the value and suit of the card
// method valueOf() is overriden in order to implement card camparison
class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	};	
}
Card.prototype.toString = function cardToString() {
	return Values[this.value] + " " + Suits[this.suit];
}
// Overriding method valueOf() in order to compare cards
Card.prototype.valueOf = function cardValueOf() {
	return this.value;
}

/////////////////////////////////////////////////////////////
// Class: Player
// This class implements the player in the game.
// Properties are name and sum of coins in the game (wallet)

class Player {
    constructor(name, initialAmount = 50) {
        this.name = name;
        this.wallet = initialAmount;
    }
    setWallet(amount) { this.wallet += amount;}
    getWallet() { return this.wallet;};

	isBroke() {
		if (this.wallet <= 0) 
			return true;
		return false;
	}

}
/////////////////////////////////////////////////////////////////////////
// Class: CardDealer
// This is the game manager class. It is responsible for dealing the cards 
// to the players and declaring who won
// Validation of bet amound is done by this class
class CardDealer {
    constructor(numPlayers=1) {
        this.numPlayers = numPlayers;
    };
	
	validateBet(betAmount, playerMax) {
		if (betAmount < 0)
			return false;
		if (betAmount > playerMax )
			return false;
		
		return true;
	};

	endGame(gameStatus) {
		console.log('\x1b[36m%s\x1b[0m', gameStatus);  

		return false;
	};

	dealCard() {
		let value = Math.floor(Math.random() * 12);
		let suit = Math.floor(Math.random() * 4);
		
		let card = new Card(value, suit);
		return card;
	}

	showCards(card1, card2) {
		let v1 = Values[card1.value];
		let v2 = Values[card2.value];
		let s1 = Suits[card1.suit];
		let s2 = Suits[card2.suit];
		let cardFaces = `
		 ______             ______
		|${v1 }    |           |${v2 }    |
		|      |           |      |
		|  ${s1}   |           |  ${s2}   |
		|      |           |      |
		|____${v1 }|           |____${v2 }|
		
		`;

		console.log(cardFaces);
	};

}


console.log(title);

let name = input.question("Welcome! Please enter your name? ");

//let gameOptions = ["1 Player", "2 Players"];
//let numPlayers = input.keyInSelect(gameOptions, "Please select option", {cancel: false});
let gameDealer = new CardDealer(); 
let bContinueGame = true;

let player1 = new Player(name);
while (bContinueGame) {
 	let minBet = 1;
	let maxBet = player1.getWallet();
	console.log(`${name}, You currently have ${maxBet} coins to play`);

	let betQuery = `Please place your bet from ${minBet} to ${maxBet}: `;
	let betAmount = input.questionInt(betQuery);
	if (!gameDealer.validateBet(betAmount, player1.getWallet())) {
		bContinueGame = gameDealer.endGame("You have entered an invalid amount, game will end, goodbye!");
		break;
	} else {
		let bDraw = false;
		do {
			let playerCard = gameDealer.dealCard();
			let dealerCard = gameDealer.dealCard();
		
			gameDealer.showCards(playerCard, dealerCard);
		

			if (playerCard < dealerCard) { // player lost
				bDraw = false;
				player1.setWallet(-betAmount);
				if (player1.isBroke()) {
					bContinueGame = gameDealer.endGame(`You lost ${betAmount} and you have no money\nYou are broke, goodbye!`);
					continue;
				}
				console.log("\x1b[36m%s\x1b[0m", `Too bad, you've lost`);
				
			} else if (playerCard > dealerCard){ // player wins
				bDraw = false;
				player1.setWallet(betAmount);
				console.log("\x1b[32m%s\x1b[0m",`You've just won ${betAmount} coins`); // green text
				console.log(`You now have ${player1.getWallet()} coins`);
			} else { // draw
				console.log("\x1b[33m%s\x1b[0m", "It's a draw, let's deal again");
				bDraw = true;
			}; 
		} while (bDraw);
		let playerQuery2 = ["Play another round?", "I would like to leave with my money"];
		let playerDecision = input.keyInSelect(playerQuery2, "What would you like to do?", {cancel:false});
		if (playerDecision == 1) { // Exit game with the money you've got
			bContinueGame = gameDealer.endGame(`*** You have ${player1.getWallet()} coins, Good Bye!!! ***`);
			break;
		}
}
}