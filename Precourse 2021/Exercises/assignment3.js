// Assignment3.js  - Hangman
// Author: Ayelet Danieli

'use strict';
const { throws } = require('assert');
const input = require('readline-sync');
var figlet = require('figlet');
const { get } = require('http');

//////////////////////////////////////////////////////
// Hangman drawings array
const hangmanDrawing = [
    `
            +
            |
            |
            |
            |
            |
      =========`, 

    `
         ---+
            |
            |
            |
            |
            |
      =========`, 

    `
        +---+
            |
            |
            |
            |
            |
      =========`, 
    `
        +---+
        |   |
            |
            |
            |
            |
      =========`, 
    `
        +---+
        |   |
        O   |
            |
            |
            |
      =========`, `
        +---+
        |   |
        O   |
        |   |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|   |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|\\  |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|\\  |
       /    |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|\\  |
       / \\  |
            |
      =========`];



/////////////////////////////////////
// Hangmna database
// source: https://github.com/Xethron/Hangman/blob/master/words.txt

const words = [ "able" , "about", "account" , "acid" , "across" , "act" , "addition" , "adjustment" , 
"advertisement" , "after" , "again" , "against" , "agreement" , "air" , "all" , "almost" , "among" , 
"amount" , "amusement" , "and" , "angle" , "angry" , "animal" , "answer" , "ant" , "any" , "apparatus" , 
"apple" , "approval" , "arch" , "argument" , "arm" , "army" , "art" , "at" , "attack" , "attempt" , 
"attention" , "attraction" , "authority" , "automatic" , "awake" , "baby" , "back" , "bad" , "bag" , 
"balance" , "ball" , "band" , "base" , "basin" , "basket" , "bath" , "be" , "beautiful" , "because" , 
"bed" , "bee" , "before" , "behaviour" , "belief" , "bell" , "bent" , "berry" , "between" , "bird" , 
"birth" , "bit" , "bite" , "bitter" , "black" , "blade" , "blood" , "blow" , "blue" , "board" , "boat" , 
"body" , "boiling" , "bone" , "book" , "boot" , "bottle" , "box" , "boy" , "brain" , "brake" , "branch" , 
"brass" , "bread" , "breath" , "brick" , "bridge" , "bright" , "broken" , "brother" , "brown" , "brush" , 
"bucket" , "building" , "bulb" , "burn" , "burst" , "business" , "but" , "butter" , "button" , "by" , "cake" , 
"camera" , "canvas" , "card" , "care" , "carriage" , "cart" , "cat" , "cause" , "certain" , "chain" , "chalk" , 
"chance" , "change" , "cheap" , "cheese" , "chemical" , "chest" , "chief" , "chin" , "church" , "circle" , "clean" , 
"clear" , "clock" , "cloth" , "cloud" , "coal" , "coat" , "cold" , "collar" , "colour" , "comb" , 
"come" , "comfort" , "committee" , "common" , "company" , "comparison" , "competition" , "complete" , 
"complex" , "condition" , "connection" , "conscious" , "control" , "cook" , "copper" , "copy" , "cord" , "cork" , "cotton" , "cough" , 
 "country" , "cover" , "cow" , "crack" , "credit" , "crime" , "cruel" , "crush" , "cry" , "cup" , "cup" , 
 "current" , "curtain" , "curve" , "cushion" , "damage" , "danger" , "dark" , "daughter" , "day" , "dead" , "dear" , 
 "death" , " debt" , "decision" , "deep" , "degree" , "delicate" , "dependent" , "design" , "desire" , 
 "destruction" , "detail" , "development" , "different" , "digestion" , "direction" , "dirty" , "discovery" , "discussion" , "disease" , "disgust" , "distance" , "distribution" , "division" , "dog" , "door" , "doubt" , "down" , 
 "drain" , "drawer" , "dress" , "drink" , "driving" , "drop" , "dry" , "dust" , "ear" , "early" , "earth" , "east" , 
 "edge" , "education" , "effect" , "egg" , "elastic" , "electric" , "end" , "engine" , "enough" , "equal" , "error" , 
 "even" , "event" , "ever" , "every" , "example" , "exchange" , "existence" , "expansion" , "experience" , "expert" , 
 "eye" , "face" , "fact" , "fall" , "family" , "far" , "farm" , "fat" , "father" , "fear" , "feather" , "feeble" , 
 "feeling" , "female" , "fertile" , "fiction" , "field" , "fight" , "finger" , "fire" , "first" , "fish" , "fixed" , 
 "flag" , "flame" , "flat" , "flight" , "floor" , "flower" , "fly" , "fold" , "food" , "foolish" , "foot" , "force" , 
 "fork" , "form" , "forward" , "fowl" , "frame" , "free" , "frequent" , "friend" , "front" , "fruit" , "full" , 
 "future" , "garden" , "general" , "get" , "girl" , "give" , "glass" , "glove" , "go" , "goat" , "gold" , "good" , 
 "government" , "grain" , "grass" , "great" , "green" , "grey" , "grip" , "group" , "growth" , "guide" , "gun" , "hair" , 
 "hammer" , "hand" , "hanging" , "happy" , "harbour" , "hard" , "harmony" , "hat" , "hate" , "have" , "he" , "head" , 
 "healthy" , "hear" , "hearing" , "heart" , "heat" , "help" , "high" , "history" , "hole" , "hollow" , "hook" , "hope" , 
 "horn" , "horse" , "hospital" , "hour" , "house" , "how" , "humour" , "ice" , "idea" , "ill" , "important" , 
 "impulse" , "increase" , "industry" , "ink" , "insect" , "instrument" , "insurance" , "interest" , "invention" , 
 "iron" , "island" , "jelly" , "jewel" , "join" , "journey" , "judge" , "jump" , "keep" , "kettle" , "key" , "kick" , "kind" , 
 "kiss" , "knee" , "knife" , "knot" , "knowledge" , "land" , "language" , "last" , "late" , "laugh" , "law" , "lead" , "leaf" , 
 "learning" , "leather" , "left" , "leg" , "letter" , "level" , "library" , "lift" , "light" , "like" , "limit" , 
 "line" , "linen" , "lip" , "liquid" , "list" , "little" , "living" , "lock" , "long" , "look" , "loose" , "loss" , 
 "loud" , "love" , "low" , "machine" , "make" , "male" , "man" , "manager" , "map" , "mark" , "market" , "married" , 
 "mass" , "match" , " material" , "may" , "meal" , "measure" , "meat" , "medical" , "meeting" , "memory" , "metal" , "middle" , "military" , 
 "milk" , "mind" , "mine" , "minute" , "mist" , "mixed" , "money" , "monkey" , "month" , "moon" , "morning" , 
 "mother" , "motion" , "mountain" , "mouth" , "move" , "much" , "muscle" , "music" , "nail" , "narrow" , "nation" , 
 "natural" , "near" , "necessary" , "neck" , "need" , "needle" , "nerve" , "news" , "night" , "no" , 
 "noise" , "normal" , "north" , "nose" , "not" , "note" , "now" , "number" , "nut" , "observation"  , "off" , 
 "offer" , "office" , "oil" , "old" , "on" , "only" , "operation" , "opinion" , "opposite" , "or" , "orange" , 
 "order" , "organization" , "ornament" , "other" , "out" , "oven" , "over" , "owner" , "page" , "pain" , "paint" , 
 "paper" , "parallel" , "parcel" , "part" , "past" , "paste" , "payment" , "peace" , "pen" , "pencil" , "person" , 
 "physical" , "picture" , "pig" , "pin" , "pipe" , "place" , "plane" , "plant" , "plate" , "play" , "please" , "pleasure" , "plough" , 
 "pocket" , "point" , "poison" , "polish" , "political" , "poor" , "porter" , "position" , "possible" , "pot" , 
 "potato" , "powder" , "power" , "present" , "price" , "prison" , "probable" , "process" , "produce" , "profit" , 
 "property" , "prose" , "protest" , "pull" , "pump" , "punishment" , "purpose" , "push" , "put" , "quality" , 
 "question" , "quick" , "quiet" , "quite" , "rail" , "rain" , "range" , "rat" , "rate" , "ray" , "reaction" , "reading" , 
 "ready" , "reason" , "receipt" , "record" , "red" , "regret" , "regular" , "relation" , "religion" , "representative" , 
 "request" , "respect" , "responsible" , "rest" , "reward" , "rhythm" , "rice" , "right" , "ring" , "river" , "road" , 
 "rod" , "roll" , "roof" , "room" , "rough" , "round" , "rub" , "rule" , "run" , "sad" , "safe" , "sail" , "salt" , 
 "same" , "sand" , "say" , "scale" , "school" , "science" , "scissors" , "screw" , "sea" , "seat" , "second" , "secret" , 
 "secretary" , "see" , "seed" , "seem" , "selection" , "self" , "send" , "sense" , "separate" , "serious" , "servant" , 
 "sex" , "shade" , "shake" , "shame" , "sharp" , "sheep" , "shelf" , "ship" , "shirt" , "shock" , "shoe" , "short" , 
 "shut" , "side" , "sign" , "silk" , "silver" , "simple" , "sister" , "size" , "skin" , "" , "skirt" , "sky" , "sleep" , "slip" , "slope" , 
 "slow" , "small" , "smash" , "smell" , "smile" , "smoke" , "smooth" , "snake" , "sneeze" , "snow" , "so" , "soap" , 
 "society" , "sock" , "soft" , "solid" , "some" , " son" , "song" , "sort" , "sound" , "soup" , "south" , "space" , "spade" , "special" , 
 "sponge" , "spoon" , "spring" , "square" , "stage" , "stamp" , "star" , "start" , "statement" , "station" , "steam" , 
 "steel" , "stem" , "step" , "stick" , "sticky" , "stiff" , "still" , "stitch" , "stocking" , "stomach" , "stone" , "store" , 
 "story" , "straight" , "strange" , "street" , "stretch" , "strong" , "structure" , "substance" , "such" , "sudden" , 
 "sugar" , "suggestion" , "summer" , "sun" , "support" , "surprise" , "sweet" , "swim" , "system" , 
 "table" , "tail" , "take" , "talk" , "tall" , "taste" , "tax" , "teaching" , "tendency" , "test" , "than" , 
 "that" , "the" , "then" , "theory" , "there" , "thick" , "thin" , "thing" , "thought" , "thread" , "throat" , 
 "through" , "through" , "thumb" , "thunder" , "ticket" , "tight" , "till" , "time" , "tin" , "tired" , "toe" , 
 "together" , "tomorrow" , "tongue" , "tooth" , "top" , "touch" , "town" , "trade" , "train" , "transport" , 
 "tray" , "tree" , "trick" , "trouble" , "trousers" , "turn" , "twist" , "umbrella" , "under" , "unit" , "up" , 
 "use" , "value" , "verse" , "very" , "vessel" , "view" , "violent" , "voice" , "waiting" , "walk" , "wall" , 
 "war" , "warm" , "wash" , "waste" , "watch" , "water" , "wave" , "wax" , "way" , "weather" , "week" , "weight" , 
 "well" , "west" , "wet" , "wheel" , "when" , "where" , "whip" , "whistle" , "white" , "who" , 
 "why" , "wide" , "will" , "wind" , "window" , "wine" , "wing" , "winter" , "wire" , "wise" , "woman" , 
 "wood" , "wool" , "word" , "work" , "worm" , "wound" , "writing" , "wrong" , "year" , "yellow" , "yes" , 
 "yesterday" , "you" , "young" , "Bernhard" , "Breytenbach" , "Android" ];

///////////////////////////////////////////////////
// helper function that counts the number of occurences of a character in a string
String.prototype.count=function(c) { 
    var result = 0, i = 0;
    for(i;i<this.length;i++)if(this[i]==c)result++;
    return result;
  };

///////////////////////////////////////////////////
// Program constants
const GameStatus = Object.freeze({WIN: 1, LOSE:2, PROCEED:3});
const ABC = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
const alphabet = ABC.split(' ');


///////////////////////////////////////
// splash screen
function splashScreen() {
    console.log("\n");
    console.log(figlet.textSync('Hangman', {
        font: 'roman',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }));}''


// This is the game class that takes care of everything
class GameManager {
    constructor() {
        this.status = GameStatus.PROCEED;
        this.numWrongGuesses = 0;
        this.numCorrectGuesses = 0;
        this.secretWord = "";
        this.correctGuesses = [];
        this.wrongGuesses = [];
    };
    numAttempts = 10;
    pickWord() {
        let n = words.length;
        let i = Math.floor(Math.random() * n); // random number range [0...n-1]
        this.secretWord = words[i];
        this.secretWord = this.secretWord.toUpperCase();
        return this.secretWord;
    };

    setStatus(newStatus) { this.status = newStatus};
    getStatus() { return this.status; };
    // add the correct letter to the array
    addToCorrectGuesses(letter) {
        let count = secretWord.count(letter);
        for (let i=0;  i < count; i += 1)
            this.correctGuesses.push(letter);
    }
    // add the wrong guessed letter to the array
    addToWrongGuesses(letter) {
        this.wrongGuesses.push(letter);
    }
    // draw the hangman 
    drawHangman() {
        console.log(hangmanDrawing[this.numWrongGuesses-1]);
    };
    // display the secret word and the alphabet 
    displaySecretWord() {
        let word = "";
        let c;
        let len = this.secretWord.length * 3 + 2;
        
        for (c of this.secretWord.toUpperCase()) {
            if (this.correctGuesses.includes(c))
                word += (` ${c} `);
            else
                word += (" _ ");
        }
        console.log(' ' + Array(len).fill('_').join('') +' ');
        console.log('|' + Array(len).fill('\xa0').join('') + '|');
        console.log('| ' + word + ' |  ' + this.drawAlphaBet()); // alphabet display
        console.log(`|` + Array(len).fill('_').join('') + `|`);
    };
    // alphabet display for the user
    drawAlphaBet() {
        let letter='';
        let gameAlphabet = "";
        for (letter of alphabet) {
            if (this.correctGuesses.includes(letter) || (this.wrongGuesses.includes(letter))) {
                gameAlphabet += " * ";
            } else {
                gameAlphabet += " " + letter + " ";
            }
        }
       return gameAlphabet;
    };
    // input validation - checks if user has entered a valid input
    validateInput(guess) {

        let message = "";
        if (guess.length > 1) {
            message = "Please enter 1 character only";
            console.log('\x1b[33m%s\x1b[0m', message);
            return false;
        }
        if ((this.correctGuesses.includes(guess)) || (this.wrongGuesses.includes(guess))) {
            message = "You have already guessed " + guess;
            console.log('\x1b[33m%s\x1b[0m', message);
            return false;
        };
   
        // convert character to ascii code to allow comparison
        let c = guess.charCodeAt(0); 
        let a = 'A'.charCodeAt(0);
        let Z = 'Z'.charCodeAt(0);
        if ((c < a) || (c > Z)) {
            message = "Wrong input (symbol or number)! Please try again";
            console.log('\x1b[33m%s\x1b[0m', message);
            return false;
        }
        return true;
    };

    checkGuess(guess) {
        if (this.validateInput(guess) == false) {
            return; 
        };
        let message = "";
        if (this.secretWord.includes(guess)) {
            this.numCorrectGuesses += 1;
            this.addToCorrectGuesses(guess);
            message = "Good guess";
           console.log( '\x1b[32m%s\x1b[0m', message)
        } else {
            message = "Wrong guess";
            console.log('\x1b[31m%s\x1b[0m', message)
            this.addToWrongGuesses(guess);
        //
            this.numWrongGuesses += 1;
        };

        if (this.numWrongGuesses >= this.numAttempts)
            this.setStatus(GameStatus.LOSE);
        if (this.correctGuesses.length == secretWord.length)
            this.setStatus(GameStatus.WIN);
    }
};
    
////////////////////////////////////////////////////////////////
   let game = new GameManager();
    let secretWord = game.pickWord().toUpperCase();
  //  console.log(`secret word is: ${secretWord}`); // tbd: remove
    splashScreen();
    
    game.displaySecretWord();

    while(game.getStatus() == GameStatus.PROCEED){
        console.log(`You have ${game.numAttempts - game.numWrongGuesses} moves left`);
        let guess = input.question("Type your guess -> ").toUpperCase();
     
        /////////////////////////////////////
        game.checkGuess(guess);
        //////////////////////////////// 
        
        game.drawHangman();
        game.displaySecretWord();
    };

    let message = "";
    switch(game.getStatus()){    
        case GameStatus.LOSE:
            message = `You lost! The word is: ${secretWord}\n`
            console.log('\x1b[33m%s\x1b[0m', message);  
            break;
        case GameStatus.WIN:
            message = "Good Job, You've got it right!";
            console.log('\x1b[32m%s\x1b[0m', message);
            break;
    }
   